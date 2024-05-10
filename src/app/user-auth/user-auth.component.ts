import { Component, OnInit } from '@angular/core';
import { login, signup } from '../data-type-inter-face';
import { UserService } from '../serivce/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent implements OnInit {
  showLogin = false;
autError:string=''
  constructor(private userSrv: UserService) {}
  ngOnInit(): void {
    this.userSrv.userAuthReload();
  }

  userSignup(data: signup) {
    //  console.warn(data)
    this.userSrv.userSignUp(data);
  }

  userLogin(data: login) {
    this.userSrv.userLogin(data);
    this.userSrv.invalidUserAuth.subscribe((res)=>{
      // console.warn("response",res)
      if(res)
        {
     this.autError='Please enter valid email and password'
        }
    })
  }
  

  //switch page
  switchpage() {
    this.showLogin = !this.showLogin;
  }
}
