import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe, SweetAlert2Module,TranslateModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{

  _WishlistService = inject(WishlistService);
  private _CartService = inject(CartService);
  private _ToastrService = inject(ToastrService);
  

  ngOnInit(): void {
    this._WishlistService.renewData();
  }


  addToCart(id:string): void{
    this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{
        if(res.status === 'success'){
          this._CartService.cartCounter.next(res.numOfCartItems);
          this._ToastrService.success(res.message, 'Fresh Cart');
        }
      }
    })
  }

}
