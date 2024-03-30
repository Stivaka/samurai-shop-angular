import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/models/Item';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})


export class DetailPageComponent {

  item!: Item;

  constructor(activatedRoute: ActivatedRoute, itemService: ItemService) {

    activatedRoute.params.subscribe((params) => {

      if (params['id'])

        itemService.getItemById(params['id']).subscribe(serverItem => {
          
          this.item = serverItem;

        });

    })
  }

}
