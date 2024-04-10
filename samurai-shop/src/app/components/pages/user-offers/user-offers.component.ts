import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/models/Item';

@Component({
  selector: 'app-user-offers',
  templateUrl: './user-offers.component.html',
  styleUrls: ['./user-offers.component.css']
})
export class UserOffersComponent {
  
  userItems:Item[] = [];

  constructor(private itemService: ItemService){
    let itemObs:Observable<Item[]>

    itemObs = itemService.getUserItems();
    itemObs.subscribe((serverItems) => {
      this.userItems = serverItems;
    })
  }
}
