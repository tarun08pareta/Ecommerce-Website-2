import { Component, OnInit } from '@angular/core';
import { login, signup } from '../data-type-inter-face';
import { UserService } from '../serivce/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit{

  showLogin = false;

constructor(private userSrv:UserService){}
ngOnInit(): void {
    this.userSrv.userAuthReload()
}

  userSignup(data:signup)
  {
//  console.warn(data)
 this.userSrv.userSignUp(data)
  }

  userLogin(data:login)
  {
    console.warn(data)
  }
  openLogin() {
    this.showLogin = !this.showLogin;
  }
}
