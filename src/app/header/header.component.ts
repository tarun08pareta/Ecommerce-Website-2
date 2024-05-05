import { Component, OnInit } from '@angular/core';
import { SellerService } from '../serivce/seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (typeof localStorage !== 'undefined') {
          if (localStorage.getItem('seller') && val.url.includes('seller')) {
            // console.warn('in seller area ');
            this.menuType = 'seller';
            if (localStorage.getItem('seller')) {
              let sellerStore = localStorage.getItem('seller');
              let sellerData = sellerStore && JSON.parse(sellerStore)[0];
              this.sellerName = sellerData.fullName;
            }
          } else {
            console.warn('outside seller');
            this.menuType = 'default';
          }
        }
      }
    });
  }
  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
}
