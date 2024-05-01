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
}
