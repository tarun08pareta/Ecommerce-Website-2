import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type-inter-face';
import { Constant } from './constant/constant';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartToData = new EventEmitter<product[] | []>();
  constructor(private http: HttpClient) {}

  addNewProduct(data: product) {
    return this.http.post(
      Constant.API_END_POINT + Constant.METHODS.ADD_PRODUCT,
      data
    );
  }

  productList() {
    return this.http.get<product[]>(
      Constant.API_END_POINT + Constant.METHODS.ADD_PRODUCT
    );
  }

  productDelete(id: string) {
    // return this.http.delete(`http://localhost:3000/products/${id}`)
    return this.http.delete(
      Constant.API_END_POINT + Constant.METHODS.PRODUCT + id
    );
  }
  getProduct(id: string) {
    return this.http.get<product>(
      Constant.API_END_POINT + Constant.METHODS.PRODUCT + id
    );
  }
  updateProduct(product: product) {
    return this.http.put<product>(
      Constant.API_END_POINT + Constant.METHODS.PRODUCT + product.id,
      product
    );
  }

  popularProducts() {
    return this.http.get<product[]>(
      Constant.API_END_POINT + Constant.METHODS.POPULAR_PRODUCT + `?_limit=3`
    );
  }
  trendyProducts() {
    return this.http.get<product[]>(
      Constant.API_END_POINT + Constant.METHODS.POPULAR_PRODUCT + `?_limit=12`
    );
  }

  searchProducts(query: string) {
    // return this.http.get<product[]>(Constant.API_END_POINT+Constant.METHODS.POPULAR_PRODUCT+`?q=${query}`)
    return this.http.get<product[]>(
      `http://localhost:3000/products?name=${query}`
    );
  }

  localAddToCart(data: product) {
    let cartData = [];
    let localCartCheck = localStorage.getItem('localcart');
    if (!localCartCheck) {
      localStorage.setItem('localcart', JSON.stringify([data]));
      this.cartToData.emit([data]);
    } else {
      cartData = JSON.parse(localCartCheck);
      cartData.push(data);
      localStorage.setItem('localcart', JSON.stringify(cartData));
    }
    this.cartToData.emit(cartData);
  }

  removeToCart(product_Id: string) {
    let cartData = localStorage.getItem('localcart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => product_Id !== item.id);
      localStorage.setItem('localcart', JSON.stringify(items));
      this.cartToData.emit(items);
    }
  }

  addToCartByUser(cartData: cart) {
    return this.http.post(
      Constant.API_END_POINT + Constant.METHODS.CART,
      cartData
    );
  }

  getCartList(userId: string) {
    return this.http
      .get<product[]>(`http://localhost:3000/cart?userId=` + userId, {
        observe: 'response',
      })
      .subscribe((res) => {
        // console.warn('respoonse:', res);
        if (res && res.body) {
          this.cartToData.emit(res.body);
        }
      });
  }

  removeToCartByUser(cartId: string) {
    // return this.http.delete(
    //   Constant.API_END_POINT + Constant.METHODS.CART+
    //   cartId
    // );
    return this.http.delete(`http://localhost:3000/cart/` + cartId);
  }

  currentCartData() {
    
    let userStore = localStorage.getItem('users');
    let userData = userStore ? JSON.parse(userStore) : null;
     return this.http.get<cart[]>(`http://localhost:3000/cart?userId=` + userData.id)
     

  }


  updateCartItem(item: cart) {
    return this.http.put<cart>(`http://localhost:3000/cart/${item.id}`, item);
   
  }


  orderNow(data:order)
  {
   return this.http.post('http://localhost:3000/orders',data)
  }
  
}
