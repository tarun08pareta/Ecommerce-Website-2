import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellingAuthComponent } from './selling-auth/selling-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductsComponent } from './seller-update-products/seller-update-products.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'seller-auth',
    component: SellingAuthComponent,
  },
  {
    path:'seller-home',
    component:SellerHomeComponent,
    canActivate:[authGuard]
  },
  {
    path:'seller-add-product',
    component:SellerAddProductComponent,
    canActivate:[authGuard]
  },
  {
    path:'seller-update-product/:id',
    component:SellerUpdateProductsComponent,
    canActivate:[authGuard]
  },
  {
    path:'search/:query',
    component:SearchComponent
  },
  {
    path: 'details/:productId',
    component:ProductDetailsComponent
  },
  {
    path:'user-auth',
    component:UserAuthComponent
  },
  {
    path:'cart',
    component:CartComponent
  },
  {
    path:'checkOut',
    component:CheckoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
