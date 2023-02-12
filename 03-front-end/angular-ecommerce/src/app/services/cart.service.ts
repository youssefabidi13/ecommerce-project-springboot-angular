import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number>= new Subject<number>();
  totalQuantity : Subject<number>= new Subject<number>();

  addToCart(theCartItem: CartItem){
    //check if we are already have the item in our cart

    let alreadyExistsInChart: boolean = false;
    let existingCartItem: CartItem  = undefined!;

    if(this.cartItems.length >0){
    //find the item in the cart based on id
    
      existingCartItem!= this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);

    //check if we found it
    alreadyExistsInChart = (existingCartItem!=undefined)
    }
    if(alreadyExistsInChart){
      //increment the quantity

      existingCartItem.quantity++;
    }else{
      //just add the item to the array
      this.cartItems.push(theCartItem);
    }

    //compute cart total price an total quantity

    this.computeCartTotals();
  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number =0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity  * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    //publish the new values .. all subscibers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue); 

    //log cart data for just debugging purpose
    this.logCartData(totalPriceValue,totalPriceValue);



  }
  logCartData(totalPriceValue: number, totalPriceValue1: number) {
    console.log('Contents of the cart');
    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity} , unitprice = ${tempCartItem.unitPrice}, subtotalprice=${subTotalPrice}`);
    }
    console.log(`total Price: ${totalPriceValue.toFixed(2)}`);
    console.log("---------------")
  }


  constructor() { }
}
