import { Component, OnInit } from '@angular/core';
import { ProductService } from '../serivce/product.service';
import { product } from '../data-type-inter-face';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent  implements OnInit{
  popularProducts: undefined| product[];
  trendyProducts : undefined | product[];
  // productItem:undefined | product[]

  constructor(private prodSrv:ProductService) {}
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  ngOnInit(): void {
      this.prodSrv.popularProducts().subscribe((res)=>{
        // console.warn(res)
        this.popularProducts = res;
      })
      this.prodSrv.trendyProducts().subscribe((res)=>{
        this.trendyProducts=res
      })
  }

  // addToCart() {
  //   if (this.productItem) {
  //     this.productItem.quantity = this.productItem;

  //     if (!localStorage.getItem('users')) {
  //       this.prodSrv.localAddToCart(this.productItem)
         
       
  //     } 
  //     // else {
  //     //   console.warn('else');
  //     // }
  //   }
  // }
}
