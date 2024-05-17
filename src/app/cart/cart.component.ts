import { Component, OnInit } from '@angular/core';
import { cart, priceSummery } from '../data-type-inter-face';
import { ProductService } from '../serivce/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ok } from 'assert';
import { HotToastService } from '@ngxpert/hot-toast';
// import { ToasterService } from '../serivce/toaster.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartList: cart[] | undefined;
  priceSummery: priceSummery = {
    price: 0,
    discount: 0,
    tex: 0,
    deliver: 0,
    total: 0,
  };

  constructor(private productSry: ProductService, private router: Router,private toast: HotToastService) {}

  ngOnInit(): void {
    this.listing();
  }

  listing() {
    this.productSry.currentCartData().subscribe((res) => {
      this.cartList = res;

      this.calculatePriceSummary();
    });

    this.productSry.currentCartData();
  }

  calculatePriceSummary() {
    let price = 0;
    if (this.cartList) {
      this.cartList.forEach((item) => {
        if (item.quantity) {
          price += +item.price * +item.quantity;
        }
      });
    }
    this.priceSummery.price = price;
    this.priceSummery.discount = price / 10;
    this.priceSummery.tex = price / 10;
    this.priceSummery.deliver = 100;
    this.priceSummery.total = price + (price / 10 + 100) - price / 10;
  }

  onRemoveFromCart(cartId: string): void {
    if (cartId) {
      this.productSry.removeToCartByUser(cartId).subscribe(() => {
        this.cartList = this.cartList?.filter((item) => item.id !== cartId);
        this.toast.success('Successfully Remove to cart!')
        this.calculatePriceSummary();
        // this.toast.success('Successfully Remove to Cart')
        // this.productSry.currentCartData().subscribe((res)=>{
        //   console.warn("res",res)
        // })
        let user = localStorage.getItem('users');
        let userId = user && JSON.parse(user).id;
        this.productSry.getCartList(userId);
      });
    }
  }

  increaseQuantity(item: cart) {
    if (item.id && item.quantity! < 20) {
      // console.warn(item.quantity)
      item.quantity! = item.quantity!+1;
      this.productSry.updateCartItem(item).subscribe();
      this.calculatePriceSummary();
     

      

     
    }
  }

  decreaseQuantity(item: cart) {
    if (item.id && item.quantity! > 1) {
      item.quantity! = item.quantity! - 1;
      this.productSry.updateCartItem(item).subscribe();
      this.calculatePriceSummary();
      

      
    }
  }
  checkOut() {
    this.toast.success('Successfully Go to CheckOut!')
    this.router.navigate(['/checkOut']);
  }

 
}
