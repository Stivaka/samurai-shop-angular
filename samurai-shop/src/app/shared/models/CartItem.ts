import { Item } from "./Item";

export class CartItem{
    constructor(public item:Item){}

    price: number = this.item.price;
}