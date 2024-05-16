import { Component, OnInit } from '@angular/core';
import { ProductService } from '../serivce/product.service';
import { cart, product } from '../data-type-inter-face';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  popularProducts: undefined | product[];
  trendyProducts: undefined | product[];
  // productItem:undefined | product[]

  constructor(private prodSrv: ProductService) {}
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  ngOnInit(): void {
    this.prodSrv.popularProducts().subscribe((res) => {
      // console.warn(res)
      this.popularProducts = res;
    });
    this.prodSrv.trendyProducts().subscribe((res) => {
      this.trendyProducts = res;
    });

    this.localCartToRemoteCart();
  }

  // addToCart() {
  //   if (this.productItem) {
  //     this.productItem.quantity = this.productItem;

  //     if (!localStorage.getItem('users')) {
  //       this.prodSrv.localAddToCart(this.productItem)

  //     }
  //     // else {
  //     //   console.warn('else');
  //     // }
  //   }
  // }

  localCartToRemoteCart() {
    if (typeof localStorage !== 'undefined') {
      let data = localStorage.getItem('localcart');

      let user = localStorage.getItem('users');

      // console.log('data', localStorage.getItem('users'));
      // console.warn('user', user);
      let userId = user && JSON.parse(user).id;
      // console.warn("userId",userId)
      if (data) {
        let cartDataList: product[] = JSON.parse(data);

        cartDataList.forEach((product: product, index) => {
          let cartData: cart = {
            ...product,
            productId: product.id,
            userId,
          };
          delete cartData.id;
          setTimeout(() => {
            this.prodSrv.addToCartByUser(cartData).subscribe((res) => {
              if (res) {
                // console.warn('item store in DB', res);
              }
            });
            if (cartDataList.length === index + 1) {
              localStorage.removeItem('localcart');
            }
          }, 500);
        });
      }
      // api call ke liye setTime out ka use krte h bhut sari api call hoti h
      setTimeout(() => {
        this.prodSrv.getCartList(userId);
      }, 2000);
    }
  }
}
