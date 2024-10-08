import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient:HttpClient) { }

  getAllCategories():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories`);
  }

  getSpecificCategory(id:any):Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories/${id}`);
  }


  getBrands(): Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands`);
  }

}
