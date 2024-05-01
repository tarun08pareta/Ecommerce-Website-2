import { Component, OnInit } from '@angular/core';
import { ProductService } from '../serivce/product.service';
import { product } from '../data-type-inter-face';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit {

  productList: product[]|undefined
constructor(private prodSry:ProductService){}
 
ngOnInit(): void {
    this.prodSry.productList().subscribe((res)=>{
    //  console.warn("product list",res)
     this.productList = res;
    })
}

}
