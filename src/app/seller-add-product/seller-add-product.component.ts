import { Component, OnInit } from '@angular/core';
import { ProductService } from '../serivce/product.service';
import { product } from '../data-type-inter-face';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css',
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;
  constructor(private prodSrv: ProductService) {}
  ngOnInit(): void {}

  productObject: product = {
    
    name: '',
    price: 0,
    category: '',
    color: '',
    image: '',
    description: '',
  };
  addNewProduct(data: product) {
    //  console.warn(data)
    this.prodSrv.addNewProduct(data).subscribe((res) => {
      // console.warn(res);
      if (res) {
        this.addProductMessage = 'Product is successfully add';
      }
      setTimeout(() => (this.addProductMessage = undefined), 3000);
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadImage(file);
    }
  }

  uploadImage(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // console.log(reader)
    reader.onload = () => {
      this.productObject.image = reader.result as string;
   
    };
    reader.onerror = error => {
      console.error('Error reading file:', error);
    };
    
  }
}
