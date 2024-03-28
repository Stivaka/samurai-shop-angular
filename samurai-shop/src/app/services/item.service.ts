import { Injectable } from '@angular/core';
import { Item } from '../shared/models/Item';
import { items } from 'src/data';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  getAll():Item[]{
    return items;
  }

  getItemById(itemId:string):Item{
    return this.getAll().find(item => item.id == itemId) ?? new Item;
  }
}
