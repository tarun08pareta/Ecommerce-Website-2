import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login, signup } from '../data-type-inter-face';
import { Constant } from './constant/constant';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  invalidUserAuth = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(user: signup) {
    // console.warn(user)
    this.http
      .post(Constant.API_END_POINT + Constant.METHODS.USER, user, {
        observe: 'response',
      })
      .subscribe((res) => {
        // console.warn(result)
        if (res) {
          localStorage.setItem('users', JSON.stringify(res.body));
          this.router.navigate(['/']);
        }
      });
  }

  // user login

  userLogin(user: login) {
    this.http
      .get<signup[]>(
        Constant.API_END_POINT +
          Constant.METHODS.USER +
          `?email=${user.email}&password=${user.password}`,

        {
          observe: 'response',
        }
      )
      .subscribe((res: any) => {
        // console.warn("response",res)

        if (res && res.body.length) {
          this.invalidUserAuth.emit(false)
          localStorage.setItem('users', JSON.stringify(res.body[0]));
          this.router.navigate(['/']);
        } else {
          this.invalidUserAuth.emit(true);
        }
      });
  }

  userAuthReload() {
    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem('users')) {
        this.router.navigate(['/']);
      }
    }
  }
}
