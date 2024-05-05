import { Component, OnInit } from '@angular/core';
import { ProductService } from '../serivce/product.service';
import { product } from '../data-type-inter-face';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent implements OnInit {
  productList: product[] | undefined;
  productMessage: undefined | string;
  constructor(private prodSry: ProductService) {}

  ngOnInit(): void {
    this.listOfProduct();
  }

  listOfProduct() {
    this.prodSry.productList().subscribe((res) => {
      //  console.warn("product list",res)
      this.productList = res;
    });
  }

  deleteProduct(id: string) {
    console.log('product id', id);
    this.prodSry.productDelete(id).subscribe((res) => {
      if (res) {
        this.productMessage = 'product is deleted';
        this.listOfProduct();
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
}
