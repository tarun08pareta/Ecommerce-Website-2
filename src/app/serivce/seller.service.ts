import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signup } from '../data-type-inter-face';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor(private http: HttpClient) {}

  userSignUp(data: signup) {
    const url = 'http://localhost:3000/seller';
    return this.http.post(url, data);
  }
}
