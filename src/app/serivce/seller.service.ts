import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { login, signup } from '../data-type-inter-face';
import { Constant } from './constant/constant';
import { BehaviorSubject } from 'rxjs';
import { flush } from '@angular/core/testing';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router) {}

  //signup api start
  userSignUp(data: signup) {
    this.http
      .post(Constant.API_END_POINT + Constant.METHODS.SELLER, data, {
        observe: 'response',
      })
      .subscribe((res) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(res.body));
        this.router.navigate(['seller-home']);
      });
    return false;
  }

  reloadSeller() {
    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem('seller')) {
        this.isSellerLoggedIn.next(true);
        this.router.navigate(['seller-home']);
      }
    }
  }

  //signup api end

  userLogin(data: login) {
    this.http
      .get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, {
        observe: 'response',
      })
      .subscribe((res: any) => {
       
        if (res && res.body && res.body.length) {
          // console.warn('user login');
          localStorage.setItem('seller', JSON.stringify(res.body));
          this.router.navigate(['seller-home']);
        } else {
          // console.warn('logined is failed');
          this.isLoginError.emit(true)
        }
      });
  }
}
