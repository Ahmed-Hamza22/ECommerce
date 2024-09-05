import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _HttpClient : HttpClient) { }

  checkOut(CartID:string | null, shippingDetails:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${CartID}?url=https://ecommerce-peach-delta-19.vercel.app/#/`,
      {
        "shippingAddress": shippingDetails
      }
    )
  }

  cashCheckOut(CartID:string | null, shippingDetails:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/${CartID}`,
      {
        "shippingAddress": shippingDetails
      }
    )
  }

  showCompleteOrders(UserID:string | null):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${UserID}`)
  }


}
