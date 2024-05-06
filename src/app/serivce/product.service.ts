import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-type-inter-face';
import { Constant } from './constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  addNewProduct(data:product)
  {
  return this.http.post(Constant.API_END_POINT+Constant.METHODS.ADD_PRODUCT , data)
  }

  productList()
  {
    return this.http.get<product[]>(Constant.API_END_POINT+Constant.METHODS.ADD_PRODUCT)
  }

  productDelete(id:string)
  {
    // return this.http.delete(`http://localhost:3000/products/${id}`)
    return this.http.delete(Constant.API_END_POINT+Constant.METHODS.PRODUCT+id)
  }
  getProduct(id:string)
  {
    return this.http.get<product>(Constant.API_END_POINT+Constant.METHODS.PRODUCT+id)
    
  }
  updateProduct(product:product)
  {
return this.http.put<product>(Constant.API_END_POINT+Constant.METHODS.PRODUCT+product.id,product)
  }

  popularProducts()
  {
    return this.http.get<product[]>(Constant.API_END_POINT+Constant.METHODS.POPULAR_PRODUCT+`?_limit=3`)
  }
  trendyProducts()
  {
    return this.http.get<product[]>(Constant.API_END_POINT+Constant.METHODS.POPULAR_PRODUCT+`?_limit=8`)
  }

  searchProducts(query:string){
    // return this.http.get<product[]>(Constant.API_END_POINT+Constant.METHODS.POPULAR_PRODUCT+`?q=${query}`)
    return this.http.get<product[]>(`http://localhost:3000/products?name=${query}`)
  }
}
