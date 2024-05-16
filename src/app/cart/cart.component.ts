import { Component, OnInit } from '@angular/core';
import { cart, priceSummery } from '../data-type-inter-face';
import { ProductService } from '../serivce/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartList: cart[] | undefined;
  priceSummery: priceSummery = {
    price: 0,
    discount: 0,
    tex: 0,
    deliver: 0,
    total: 0,
  };

  constructor(
    private productSry: ProductService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.productSry.currentCartData().subscribe((res) => {
      this.cartList = res;

      let price = 0;
      res.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price* + item.quantity);
        }
      });
      this.priceSummery.price = price;
      this.priceSummery.discount = price / 10;
      this.priceSummery.tex = price / 10;
      this.priceSummery.deliver = 100;
      this.priceSummery.total = price + (price / 10 + 100) - price / 10;
    });

    this.productSry.currentCartData();
  }

  onRemoveFromCart(cartId: string): void {
    if (cartId) {
      this.productSry.removeToCartByUser(cartId).subscribe(() => {
        this.cartList = this.cartList?.filter((item) => item.id !== cartId);
      });
    }
  }

  increaseQuantity(item: cart) {
    if (item.id && item.quantity! < 20) {
      item.quantity! += 1;
      this.productSry.updateCartItem(item).subscribe();
    }
  }

  decreaseQuantity(item: cart) {
    if (item.id && item.quantity! > 1) {
      item.quantity! -= 1;
      this.productSry.updateCartItem(item).subscribe();
    }
  }
  checkOut()
  {
    this.router.navigate(['/checkOut'])
  }
}
