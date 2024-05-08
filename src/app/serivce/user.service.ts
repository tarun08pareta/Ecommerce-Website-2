import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signup } from '../data-type-inter-face';
import { Constant } from './constant/constant';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient , private router:Router) {}

  userSignUp(user: signup) {
    // console.warn(user)
    this.http
      .post(Constant.API_END_POINT + Constant.METHODS.USER, user, {
        observe: 'response',
      })
      .subscribe((res) => {
        // console.warn(result)
        if (res) {
          localStorage.setItem('users',JSON.stringify(res.body));
          this.router.navigate(['/']);
        }
      });
  }

  userAuthReload()
  {
    if(typeof localStorage !== 'undefined'){
      if(localStorage.getItem('users'))
        {
          this.router.navigate(['/'])
        }
    }
  }
}
