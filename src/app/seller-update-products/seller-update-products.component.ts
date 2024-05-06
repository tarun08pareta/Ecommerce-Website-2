import { Component, OnInit } from '@angular/core';
import { product } from '../data-type-inter-face';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../serivce/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-update-products',
  templateUrl: './seller-update-products.component.html',
  styleUrl: './seller-update-products.component.css',
})
export class SellerUpdateProductsComponent implements OnInit {
  productData: undefined | product;
  imageBases64: string = '';
  updateProductMessage: string | undefined;
  constructor(
    private route: ActivatedRoute,
    private prodSry: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.warn('product_Id', productId);

    productId &&
      this.prodSry.getProduct(productId).subscribe((res) => {
        // console.warn(res);
        this.productData = res;
        // console.warn('id', this.productData);
        
      });
  }

  Producupdatet(data: product) {
    if(this.productData)
      {
        data.id=this.productData.id
       
      }
    this.prodSry.updateProduct({...data,image:this.imageBases64}).subscribe((res) => {
      if (res) {
        this.updateProductMessage = 'product is updated';

        
      }
    });
    setTimeout(() => {
      this.updateProductMessage = undefined
      this.router.navigate(['/seller-home']);
      
  }, 3000);
    

  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      console.warn(file)
      reader.onload = () => {
       this.imageBases64 = reader.result as string;
      };
    }
  }


}
