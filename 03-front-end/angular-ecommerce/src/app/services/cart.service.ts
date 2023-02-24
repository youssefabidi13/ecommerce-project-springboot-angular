import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  

  cartItems: CartItem[] = [];

  totalPrice: Subject<number>= new BehaviorSubject<number>(0);
  totalQuantity : Subject<number>= new BehaviorSubject<number>(0);

  //reference to web browsser session storage
  //storage: Storage = sessionStorage;
  storage: Storage = localStorage;

  addToCart(theCartItem: CartItem){
    //check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if(this.cartItems.length > 0){
      //find the item in the cart based on id
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id)!;

      //check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }
    if(alreadyExistsInCart){
      //increment the quantity
      existingCartItem.quantity++;
    } else {
      //just add the item to the array
      this.cartItems.push(theCartItem);
    }

    //compute cart total price and total quantity
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

    //persist cart data
    this.persistCartItems();



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

  derementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;
    if(theCartItem.quantity === 0){
      this.remove(theCartItem);
    }else{
      this.computeCartTotals();
    }
  }
  remove(theCartItem: CartItem) {
    //get index of item in the array 
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id );


    //if found , remove the item from array at the given index
    if(itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }

  persistCartItems(){
    this.storage.setItem('cartItems',JSON.stringify(this.cartItems));
  }

  constructor() {
    
    //read data from storage
    let data =JSON.parse(this.storage.getItem('cartItems'));

    if(data != null){
      this.cartItems = data;

      //compute totals bases on the data that is read from storage
      this.computeCartTotals();
    }

   }
}
