import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http : HttpClient) { }
  getData(){
    return this.http.get<any>("https://fakestoreapi.com/products")
  }
}
