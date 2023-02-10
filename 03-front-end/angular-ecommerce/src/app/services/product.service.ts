import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
   
  
  private baseUrl='http://localhost:8099/api/products';
  private categoryUrl = 'http://localhost:8099/api/product-category';
  constructor(private httpClient: HttpClient) { }
  getProduct(theProductId: number): Observable<Product> {
    // need to build a url based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }
  getProductListPaginate(thePage: Number
    ,thePageSize: number
    ,theCategoryId: number): Observable<GetResponseProducts>{

    //need to build URL based on category id,page and size
    const searchUrl =`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                      + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
  getProductList(theCategoryId: number): Observable<Product[]>{

    //@TODO:  need to build URL based on category id 
    const searchUrl =`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductsCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
  searchProducts(theKeyword: string): Observable<Product[]> {
    //need to build URL based on the keyword
    const searchUrl =`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }

  searchProductPaginate(thePage: Number
    ,thePageSize: number
    ,theKeyword: string): Observable<GetResponseProducts>{

    //need to build URL based on keyword,page and size
    const searchUrl =`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                      + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}
interface GetResponseProducts{
  _embedded: {
    products: Product[];
  },
  page:{
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
interface GetResponseProductsCategory{
  _embedded: {
    productCategory: ProductCategory[];
  }
}