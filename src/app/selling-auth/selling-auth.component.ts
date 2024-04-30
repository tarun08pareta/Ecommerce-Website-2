import { Component, OnInit } from '@angular/core';
import { SellerService } from '../serivce/seller.service';
import { Router } from '@angular/router';
import { signup } from '../data-type-inter-face';

@Component({
  selector: 'app-selling-auth',
  templateUrl: './selling-auth.component.html',
  styleUrl: './selling-auth.component.css',
})
export class SellingAuthComponent implements OnInit {
  constructor(private sellerSrv: SellerService, private router: Router) {}
  showLogin = false;
  authError: string = '';
  ngOnInit(): void {
    this.sellerSrv.reloadSeller();
  }
  signup(data: signup): void {
    this.sellerSrv.userSignUp(data);
  }

  Login(data: any) {
    this.authError =''
    this.sellerSrv.userLogin(data);
    this.sellerSrv.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Email  and Password is not correct';
      }
    });
  }
  openLogin() {
    this.showLogin = !this.showLogin;
  }
}
