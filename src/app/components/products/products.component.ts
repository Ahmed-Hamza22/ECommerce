import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../../core/interfaces/iproduct';
import { ProductsService } from '../../core/services/products.service';
import { RouterLink } from '@angular/router';
import { NgClass, NgStyle } from '@angular/common';
import { TermPipe } from '../../core/pipes/term.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, NgStyle, TermPipe, SearchPipe, FormsModule,NgClass,TranslateModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  
  private _ProductsService = inject(ProductsService);
  private _CartService = inject(CartService);
  private _ToastrService = inject(ToastrService);
  readonly _WishlistService = inject(WishlistService);

  productsList:IProduct[] = [];
  searchTerm:string = '';

  ngOnInit(): void {    
    this._ProductsService.getAllProducts().subscribe({
      next:(res)=>{
        this.productsList = res.data;
      }
    });


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
