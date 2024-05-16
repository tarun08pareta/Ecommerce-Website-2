import { Component, OnInit } from '@angular/core';
import { ProductService } from '../serivce/product.service';
import { product } from '../data-type-inter-face';

import { MatDialog } from '@angular/material/dialog';
import { DeleteProductModalComponent } from './delete-product-modal/delete-product-modal.component';
// import { DeleteProductModalComponent } from '../delete-product-modal/delete-product-modal.component';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent implements OnInit {
  productList: product[] | undefined;
  productMessage: undefined | string;
  constructor(private prodSry: ProductService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.listOfProduct();
  }

  listOfProduct() {
    this.prodSry.productList().subscribe((res) => {
      //  console.warn("product list",res)
      this.productList = res;
    });
  }

  // deleteProduct(id: string) {
  //   console.log('product id', id);
  //   this.prodSry.productDelete(id).subscribe((res) => {
  //     if (res) {
  //       this.productMessage = 'product is deleted';
  //       this.listOfProduct();
  //     }
  //   });
  //   setTimeout(() => {
  //     this.productMessage = undefined;
  //   }, 3000);
  // }
  deleteProduct(product: product) {
    const dialogRef = this.dialog.open(DeleteProductModalComponent, {
      width: '350px',
      height: '450px',
      enterAnimationDuration:'100ms',
      exitAnimationDuration : '100ms',
      data: { id: product.id, name: product.name, image: product.image }
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        this.prodSry.productDelete(product.id).subscribe((res) => {
          if (res) {
            this.productMessage = 'Product is deleted';
            this.listOfProduct();
          }
        });
        setTimeout(() => {
          this.productMessage = undefined;
        }, 3000);
      }
    });
  }
}
