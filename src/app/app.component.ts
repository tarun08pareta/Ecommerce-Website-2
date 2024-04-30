import { Component, OnInit } from '@angular/core';
import { SellerService } from './serivce/seller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'E-Commerce-Website2';

  constructor(private sellerSrv:SellerService){}
ngOnInit(): void {
    
}

}
