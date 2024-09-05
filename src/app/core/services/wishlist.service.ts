import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';
import { IProduct } from '../interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.favouriteListIDs = localStorage.getItem('favList');
    }
  }

  private _HttpClient = inject(HttpClient);
  private _ToastrService = inject(ToastrService);
  private _PLATFORM_ID = inject(PLATFORM_ID);

  favouriteListIDs: any[] | any  = [];
  wishList:IProduct[] = [];


  addProductToWishList(pId:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
      {
        "productId" : pId
      }
    )
  }

  removeProductFromWishList(pId:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${pId}`
    )
  }

  getUserWishList():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`);
  }



  addToFav(id:string):void{
    this.addProductToWishList(id).subscribe({
      next:(res)=>{
        if(res.status === 'success'){
          this.favouriteListIDs = res.data;
          if (isPlatformBrowser(this._PLATFORM_ID)) {
            localStorage.setItem('favList',res.data);
          }
          this.renewData();
          this._ToastrService.success(res.message+' ❤️');
        }
      }
    });
  }
  
  removeFromFav(id:string):void{
    this.removeProductFromWishList(id).subscribe({
      next:(res)=>{
        if(res.status === 'success'){
          this.favouriteListIDs = res.data;
          if (isPlatformBrowser(this._PLATFORM_ID)) {
            localStorage.setItem('favList',res.data);
          }
          this.renewData();
          this._ToastrService.success("Product removed successfully from your wishlist 💔");
        }
      }
    });
  }

  renewData():void{
    this.getUserWishList().subscribe({
      next:(res)=>{
        if(res.status === 'success'){
          this.wishList = res.data;
        }
      }
    })
  }

  favToggle(id:string, e:Event):void{
    e.stopPropagation();
    if(this.favouriteListIDs?.includes(id)){
      this.removeFromFav(id);
    }else{
      this.addToFav(id);
    }
  
  }

}