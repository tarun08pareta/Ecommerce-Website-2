import { Component, OnInit } from '@angular/core';
import { SellerService } from '../serivce/seller.service';
import { Router } from '@angular/router';
import { ProductService } from '../serivce/product.service';
import { product } from '../data-type-inter-face';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  searchResult: undefined | product[];
  cartItem:number = 0;
  constructor(private router: Router, private prodSrv: ProductService) {}

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (typeof localStorage !== 'undefined') {
          if (localStorage.getItem('seller') && val.url.includes('seller')) {
            // console.warn('in seller area ');
            this.menuType = 'seller';
            if (localStorage.getItem('seller')) {
              let sellerStore = localStorage.getItem('seller');
              let sellerData = sellerStore && JSON.parse(sellerStore);
              // console.log(sellerData)
              this.sellerName = sellerData.fullName;
            }
          } else if (localStorage.getItem('users')) {
            let userStore = localStorage.getItem('users');
            let userData = userStore ? JSON.parse(userStore) : null;
            this.userName = userData.fullName;
            this.menuType = 'user';
            this.prodSrv.getCartList(userData.id);  // home page pr aane pr cart 0 nhi hoga
            // console.warn('inside user');
          } else {
            // console.warn('outside seller');
            this.menuType = 'default';
          }
        }
      }
    });
    if (typeof localStorage !== 'undefined') {
      let cartData = localStorage.getItem('localcart');
      if (cartData) {
        this.cartItem = JSON.parse(cartData).length;
      }
    }
    this.prodSrv.cartToData.subscribe((res) => {
      this.cartItem=res.length
      
    })

    // this.prodSrv.currentCartData().subscribe((res)=>{
    //   this.cartItem=res.length
      
    // })
    // console.warn("resp",this.cartItem)
  }

  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  userLogout() {
    localStorage.removeItem('users');
    this.router.navigate(['/']);
    this.prodSrv.cartToData.emit([]);
  }

  searchProducts(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      // console.warn('element value:',element.value);

      this.prodSrv.searchProducts(element.value).subscribe((res) => {
        console.warn('Response:', res);

        if (res.length > 5) {
          res.length = length;
        }
        this.searchResult = res;
      });
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }

  redirectToDetails(id: number) {
    this.router.navigate(['/details/', +id]);
  }
  submitSearch(val: string) {
    // console.warn(val);
    this.router.navigate([`search/${val}`]);
  }
}
