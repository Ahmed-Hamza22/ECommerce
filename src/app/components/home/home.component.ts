import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { NgStyle } from '@angular/common';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategories } from '../../core/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { TermPipe } from '../../core/pipes/term.pipe';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgStyle, CarouselModule, RouterLink, TermPipe, FormsModule, SearchPipe, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{

  private _ProductsService = inject(ProductsService);
  private _CategoriesService = inject(CategoriesService);
  private _CartService = inject(CartService);
  readonly _WishlistService = inject(WishlistService);
  private _ToastrService = inject(ToastrService);


  productsList:IProduct[] = [];
  getAllProductsSubscription!:Subscription;

  categoriesList:Icategories[] = [];
  getAllCategoriesSubscription!:Subscription;

  wishlistHeart:boolean = false;

  searchTerm: string = "";


  ngOnInit(): void {
    this.getAllProductsSubscription = this._ProductsService.getAllProducts().subscribe({
      next:(res)=>{
        // console.log(res.data);
        this.productsList = res.data;
      }
    });


    this.getAllCategoriesSubscription = this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        // console.log(res.data);
        this.categoriesList = res.data;
      }
    });

  }

  ngOnDestroy(): void {
    this.getAllProductsSubscription?.unsubscribe();
    this.getAllCategoriesSubscription?.unsubscribe();
  }


  addToCart(id:string): void{
    this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{
        // console.log(res);
        this._CartService.cartCounter.next(res.numOfCartItems);
        this._ToastrService.success(res.message, 'Fresh Cart');
      }
    });
  }











  // owl
  customOptionsCategories: OwlOptions = {
    rtl:true,
    autoplaySpeed:1000,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }


  customOptionsMain: OwlOptions = {
    rtl:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    autoplaySpeed:2000,
    autoplay:true,
    nav: true
  }

}
