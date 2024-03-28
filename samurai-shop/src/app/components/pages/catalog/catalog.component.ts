import { Component } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/models/Item';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {

  allItems:Item[] = [];

  constructor(private itemService: ItemService){
    this.allItems = itemService.getAll();
  }
}
