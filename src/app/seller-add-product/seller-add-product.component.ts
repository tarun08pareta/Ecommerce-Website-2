import { Component, OnInit } from '@angular/core';
import { ProductService } from '../serivce/product.service';
import { product } from '../data-type-inter-face';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css',
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;

  // productObject: product = { image: '' };

  constructor(private prodSrv: ProductService,private router:Router) {}
  ngOnInit(): void {}

  // productObject: product = {
  //   id: '',
  //   name: '',
  //   price: 0,
  //   category: '',
  //   color: '',
  //   image: '',
  //   description: '',
  //   quantity: 0,
  // };
  imageBases64: string = '';
  
  addNewProduct(data: product) {
    console.warn({ ...data, image: this.imageBases64 });
    this.prodSrv
      .addNewProduct({ ...data, image: this.imageBases64 })
      .subscribe((res) => {
        // console.warn(res);
        if (res) {
          this.addProductMessage = 'Product is successfully add';
        }
        setTimeout(() => {
          this.addProductMessage = undefined;
          this.router.navigate(['/seller-home']);
        }, 3000);
      });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      console.warn(file);

      reader.onload = () => {
        this.imageBases64 = reader.result as string;
        
      };
    }

    // console.log(reader)
  }
}
