import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../serivce/product.service';
import { product } from '../data-type-inter-face';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productDetailes: undefined | product;
  
  productQuantity: number = 1;
  constructor(
    private activateRoute: ActivatedRoute,
    private productSrv: ProductService
  ) {}
  ngOnInit(): void {
    let product_Id = this.activateRoute.snapshot.paramMap.get('productId');
    // console.warn("productId",product_Id)
    product_Id &&
      this.productSrv.getProduct(product_Id).subscribe((res) => {
        // console.warn(res)

        this.productDetailes = res;

        // console.warn('data',this.productDetailes)
      });
  }

  
  decreaseQuantity() {
    if (this.productQuantity > 1) {
      this.productQuantity--;
    }
  }
  
  increaseQuantity() {
    if (this.productQuantity < 20) {
      this.productQuantity++;
    }
  }
}
