import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/models/Item';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})


export class DetailPageComponent {

  item!: Item;

  constructor(activatedRoute: ActivatedRoute, private itemService: ItemService,
     private router:Router, private toastrService: ToastrService, private cartService:CartService) {

    activatedRoute.params.subscribe((params) => {

      if (params['id'])

        itemService.getItemById(params['id']).subscribe(serverItem => {
          
          this.item = serverItem;
          

        });

    })
  
  }
  
  get isOwnOffer(){

    if (localStorage.getItem('User')){
      
      const userToken = JSON.parse(localStorage.getItem(`User`) || '');
      if (this.item.owner == userToken.id){
  
        return true;
      } 
    }

    return false;

  }

  addClick() {
    if (localStorage.getItem('User')){

      this.cartService.addToCart(this.item);
      this.router.navigateByUrl('/cart');
    } else{
      this.router.navigateByUrl(`/login`)
    }
  }

  editBtn(){
    
    this.router.navigateByUrl('/edit/' + this.item.id)

  }

  deleteBtn(){

    this.itemService.deleteItem(this.item.id).subscribe({

      next:() => {
        this.router.navigateByUrl(`/catalog`);
      },
      error:(error) => {
        this.toastrService.error(error.error, 'Cannot delete offer');
      }
    });
  }

}
