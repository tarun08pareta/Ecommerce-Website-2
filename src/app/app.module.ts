import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SellingAuthComponent } from './selling-auth/selling-auth.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AngularFontAwesomeComponent, AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductsComponent } from './seller-update-products/seller-update-products.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FooterComponent } from './footer/footer.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SellingAuthComponent,
    SellerHomeComponent,
    SellerAddProductComponent,
    SellerUpdateProductsComponent,
    SearchComponent,
    ProductDetailsComponent,
    FooterComponent,
    UserAuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,RouterOutlet,RouterLink,FormsModule,HttpClientModule, NgbModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
