import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { NgIf, NgStyle } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgStyle,NgIf,CarouselModule,TranslateModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private _CartService = inject(CartService);
  private _ToastrService = inject(ToastrService);
  readonly _WishlistService = inject(WishlistService);


  productDetails:IProduct | null = null;  // أو  productDetails:IProduct = {} as IProduct     أو     productDetails!:IProduct;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        let productId = params.get('id');
        this._ProductsService.getSpecificProduct(productId).subscribe({
          next:(res)=>{
            // console.log(res.data);
            this.productDetails = res.data;
          },
          error:(err)=>{
            // console.log(err);
          }
        })
      }
    });
  }

  addToCart(id:string): void{
    this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{
        // console.log(res);
        this._CartService.cartCounter.next(res.numOfCartItems);
        this._ToastrService.success(res.message, 'Fresh Cart');
      }
    })
  }



  customOptionsDetails: OwlOptions = {
    rtl:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
  }

}
