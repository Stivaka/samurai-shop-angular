import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../shared/models/Item';
import { CartItem } from '../shared/models/CartItem';
import { HttpClient } from '@angular/common/http';
import { user_checkout } from '../shared/https/url';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor(private http:HttpClient) { }

  proceedToCheckout():Observable<Cart>{
    
    return this.http.get<Cart>(user_checkout);
  }

  addToCart(item:Item):void{
    let cartItem = this.cart.items.find(current => current.item.id === item.id);

    if(cartItem){
      return;
    }

    this.cart.items.push(new CartItem(item));
    this.setCartToLocalStorage();
  }

  removeFromcart(itemId:string):void{
    this.cart.items = this.cart.items
    .filter(current => current.item.id != itemId);
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable():Observable<Cart>{

    return this.cartSubject.asObservable();
  }
  

  private setCartToLocalStorage():void{
    this.cart.totalPrice = this.cart.items
    .reduce((prevSum, currentItem) => prevSum + currentItem.price.valueOf(), 0);
    const cartJson = JSON.stringify(this.cart);

    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage():Cart{
    const cartJson = localStorage.getItem(`Cart`);

    return cartJson? JSON.parse(cartJson): new Cart();
  }

}
