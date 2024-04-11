import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cart!:Cart;

  constructor(private cartService:CartService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
  }

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromcart(cartItem.item.id);
  }

  checkout(){
    if (this.cart.items.length == 0){
      return;
    }
    console.log();
    
    
    this.cartService.proceedToCheckout();

    this.cartService.clearCart();
    
  }
}
