import { Injectable } from '@angular/core';
import { Item } from '../shared/models/Item';
import { items } from 'src/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catalog_url, details_item_by_id } from '../shared/https/url';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Item[]>{

    return this.http.get<Item[]>(catalog_url);

  }

  getItemById(itemId:string):Observable<Item>{
    return this.http.get<Item>(details_item_by_id + itemId);
  }
}
