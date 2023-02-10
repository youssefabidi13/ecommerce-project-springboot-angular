import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent {
  
  product: Product = new Product();
  constructor(private productSerivce: ProductService,
    private route: ActivatedRoute){
    
  }
  ngOnInit(): void{
      this.route.paramMap.subscribe(()=>{
        this.handleProductDetails();
      })
  }
  handleProductDetails() {
    //get the "id" param string .convert string to a number using the "+" symbol;

    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productSerivce.getProduct(theProductId).subscribe(
      data =>{
        this.product=data;
      }
    )
  }
}
