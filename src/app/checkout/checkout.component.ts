import { Component, OnInit } from '@angular/core';
import { ProductService } from '../serivce/product.service';
import { order, priceSummery } from '../data-type-inter-face';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  constructor(private productSry: ProductService, private router:Router) {}
  ngOnInit(): void {
    this.productSry.currentCartData().subscribe((res) => {
      let price = 0;
      res.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
       
      });
      this.totalPrice=price+ ((price / 10 + 100) - price / 10)
    });
  }

  orderNow(data: {email:string,address:string,contact:number}) {
    // console.warn('data', data);
    let user = localStorage.getItem('users')
    let userId = user && JSON.parse(user).id

    if(this.totalPrice)
      {
        let orderData:order={
          ...data,
          totalPrice:this.totalPrice,
          userId
        }
        this.productSry.orderNow(orderData).subscribe((res)=>{
          alert('order placed')
          // console.warn(res)
          this.router.navigate(['/myOrder'])
        })
      }
      
  }
}
