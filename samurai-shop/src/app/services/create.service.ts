import { Injectable } from '@angular/core';
import { Item } from '../shared/models/Item';
import { HttpClient } from '@angular/common/http';
import { create_item_method } from '../shared/https/url';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(private http: HttpClient) { }

  create(offer: Item){
    return this.http.post<Item>(create_item_method, offer);
  }
}
