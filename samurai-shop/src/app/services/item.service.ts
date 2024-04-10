import { Injectable } from '@angular/core';
import { Item } from '../shared/models/Item';
// import { items } from 'src/data';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { catalog_url, create_item_method, delete_item, details_item_by_id, user_offers } from '../shared/https/url';
import { CreateItem } from '../shared/interfaces/create_item';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http:HttpClient, private ToastrService:ToastrService, private router:Router) { }

  getAll(): Observable<Item[]>{

    return this.http.get<Item[]>(catalog_url);

  }

  getItemById(itemId:string):Observable<Item>{
    return this.http.get<Item>(details_item_by_id + itemId)
  }

  deleteItem(itemId:string): Observable<Item>{
    
    return this.http.get<Item>(delete_item + itemId);
  }


  getUserItems(): Observable<Item[]>{

    return this.http.get<Item[]>(user_offers);
  }
}
