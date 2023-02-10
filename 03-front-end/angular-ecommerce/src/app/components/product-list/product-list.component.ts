import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId!: number;
  searchMode!: boolean;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
  //check if "id" parameter is available
  listProducts() {
    this.searchMode=this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }
  }
  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    
    //now search for the products using keyword
    this.productService.searchProducts(theKeyword).subscribe(
      date =>{
        this.products= date;
      }
    );
  }

  handleListProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      //get id param string . convert string to  a number using the + symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      //not category id available .. default to category id 1
      this.currentCategoryId = 1;
    }
    //now get the products for the given category id 
    this.productService.getProductList(this.currentCategoryId).subscribe((data) => {
      this.products = data;
    });
  }

}












