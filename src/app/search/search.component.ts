import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../serivce/product.service';
import { product } from '../data-type-inter-face';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  searchResults: undefined | product[];
  constructor(private route: ActivatedRoute, private prodSrv: ProductService) {}

  ngOnInit(): void {
    let query = this.route.snapshot.paramMap.get('query');
    // console.warn('query:', query);
    query &&
      this.prodSrv.searchProducts(query).subscribe((res) => {
        this.searchResults = res;
        // console.warn(this.searchResults);
      });
  }
}
