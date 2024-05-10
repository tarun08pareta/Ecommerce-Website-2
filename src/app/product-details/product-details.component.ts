import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../serivce/product.service';
import { cart, product } from '../data-type-inter-face';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productDetailes: undefined | product;

  productQuantity: number = 1;
  removecart :boolean=false
  constructor(
    private activateRoute: ActivatedRoute,
    private productSrv: ProductService
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
     if(typeof localStorage !=='undefined'){
      let cartdata= localStorage.getItem('localcart');
      if(product_Id && cartdata){
        let items= JSON.parse(cartdata);
        items= items.filter((item:product)=>product_Id==item.id.toString());
        if(items.length)
          {
            this.removecart= true
          }else{
            this.removecart= false
          }
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
        this.productSrv.localAddToCart(this.productDetailes)
        this.removecart= true  
       
      } 
      //user login h tb 
      else{
        // console.warn("user login")
        let user = localStorage.getItem('users');
        let userId= user && JSON.parse(user).id
        // console.warn('userId',userId)
        let cartData :cart = {
          ...this.productDetailes,
          userId,
          productId:this.productDetailes.id
        }
        delete cartData.id
        // console.warn("product Data", userData)
        this.productSrv.addToCartByUser(cartData).subscribe((res)=>{
          // console.warn('res',res)
          if(res)
            {
              alert('product added to cart')
            }
        })

      }
     
    }
  }

  removeToCart(product_Id:string)
  {
this.productSrv.removeToCart(product_Id)
this.removecart= false
  }
}
