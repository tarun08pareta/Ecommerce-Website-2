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
  ngOnInit(): void {}
  constructor(private sellerService: SellerService, private router: Router) {}
  signup(data: signup): void {
    this.sellerService.userSignUp(data).subscribe((res: any) => {
      if (res) {
        this.router.navigateByUrl('/seller-home');
      }
    });
  }
}
