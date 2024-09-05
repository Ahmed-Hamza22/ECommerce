import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _HttpClient = inject(HttpClient);

  cartCounter: BehaviorSubject<number> =new BehaviorSubject(0);


  addProductToCart(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        "productId": id
      },
    )
  }

  getProductsCart(): Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`)
  }

  deleteSpecificCartItem(id:string): Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`)
  }

  updateProductQuantity(id:string, count:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        "count":count
      },
  )
  }

  deleteAllCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`)
  }

}