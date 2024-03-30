import { Component } from '@angular/core';
import { Observable } from 'rxjs';
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
    let itemObs:Observable<Item[]>

    itemObs = itemService.getAll();
    itemObs.subscribe((serverItems) => {
      this.allItems = serverItems;
    })
  }

}
