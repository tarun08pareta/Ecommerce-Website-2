import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../serivce/product.service';
import { cart, product } from '../data-type-inter-face';
import { HotToastClose, HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productDetailes: undefined | product;

  productQuantity: number = 1;
  removecart: boolean = false;
  cartDataByUser: product | undefined;
  itemDData: any;
  constructor(
    private activateRoute: ActivatedRoute,
    private productSrv: ProductService,
    private toast:HotToastService
  ) {}
  ngOnInit(): void {
    let product_Id = this.activateRoute.snapshot.paramMap.get('productId');
    // console.warn("productId",product_Id)
    product_Id &&
      this.productSrv.getProduct(product_Id).subscribe((res) => {
        // console.warn(res)
   
        this.productDetailes = res;
        

        // console.warn('data',this.productDetailes)
      });

    // remove to cart
    if (typeof localStorage !== 'undefined') {
      let cartdata = localStorage.getItem('localcart');
      if (product_Id && cartdata) {
        let items = JSON.parse(cartdata);
        items = items.filter(
          (item: product) => product_Id == item.id.toString()
        );
        if (items.length) {
          this.removecart = true;
        } else {
          this.removecart = false;
        }
      }

      let user = localStorage.getItem('users');
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.productSrv.getCartList(userId);
        this.productSrv.cartToData.subscribe((res) => {
          let item = res.filter(
            (item: any) =>
              product_Id?.toString() === item.productId?.toString()
          );
          // console.log("id",product_Id)
          // console.log("res",res)
          // console.log("item",item)

          if (item.length) {
                this.cartDataByUser = item[0];
            this.removecart = true;
          }
         
        });
      }
    }
  }

  decreaseQuantity() {
    if (this.productQuantity > 1) {
      this.productQuantity--;
    }
  }

  increaseQuantity() {
    if (this.productQuantity < 20) {
      this.productQuantity++;
    }
  }

  // add to cart function
  addToCart() {
    if (this.productDetailes) {
      this.productDetailes.quantity = this.productQuantity;

      if (!localStorage.getItem('users')) {
        this.productSrv.localAddToCart(this.productDetailes);
        this.removecart = true;
      }
      //user login h tb
      else {
        // console.warn("user login")
        let user = localStorage.getItem('users');
        let userId = user && JSON.parse(user).id;
        // console.warn('userId',userId)
        let cartData: cart = {
          ...this.productDetailes,
          userId,
          productId: this.productDetailes.id,
        };
        delete cartData.id;
        // console.warn("product Data", userData)
        this.productSrv.addToCartByUser(cartData).subscribe((res) => {
          // console.warn('res',res)
          if (res) {
            // alert('product added to cart');
            this.toast.success('Successfully Add To Cart')
            this.productSrv.getCartList(userId);
            this.removecart = true;
          }
        });
      }
    }
  }

  removeToCart(product_Id: string) {
    if (!localStorage.getItem('users')) {
      this.productSrv.removeToCart(product_Id);
      this.removecart = false;
    } else {
      let user = localStorage.getItem('users');
        let userId = user && JSON.parse(user).id;

      // console.warn('cartDataByUser', this.cartDataByUser);

      this.cartDataByUser &&
        this.productSrv
          .removeToCartByUser(this.cartDataByUser.id)
          .subscribe((res) => {
            if (res) {
              this.toast.success('Successfully Remove To Cart')
              this.productSrv.getCartList(userId);
              
            }
          });
          this.removecart = false;
    }
  }
}
