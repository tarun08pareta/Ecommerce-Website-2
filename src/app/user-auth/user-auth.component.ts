import { Component, OnInit } from '@angular/core';
import { cart, login, product, signup } from '../data-type-inter-face';
import { UserService } from '../serivce/user.service';
import { ProductService } from '../serivce/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent implements OnInit {
  showLogin = true;
  autError: string = '';
  constructor(private userSrv: UserService, private prodSrv: ProductService) {}
  ngOnInit(): void {
    this.userSrv.userAuthReload();
  }

  userSignup(data: signup) {
    //  console.warn(data)
    this.userSrv.userSignUp(data);
  }

  userLogin(data: login) {
    this.userSrv.userLogin(data);
    this.userSrv.invalidUserAuth.subscribe((error) => {
      // console.warn("response",res)
      if (error) {
        this.autError = 'Please enter valid email and password';
      } else {
       
        
      }
    });
  }

  //switch page
  switchpage() {
    this.showLogin = !this.showLogin;
  }

 
}
