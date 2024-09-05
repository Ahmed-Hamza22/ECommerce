import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslationService } from '../../core/services/translation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-main',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.scss'
})
export class NavMainComponent implements OnInit{
  readonly _AuthService = inject(AuthService);
  private _TranslationService = inject(TranslationService);
  readonly _TranslateService = inject(TranslateService);
  private _CartService = inject(CartService);


  counter:number = 0

  ngOnInit(): void {

    this._CartService.getProductsCart().subscribe({
      next:(res)=>{
        this._CartService.cartCounter.next(res.numOfCartItems);
      }
    })

    this._CartService.cartCounter.subscribe({
      next:(data)=>{
        this.counter = data;
      }
    });
  }


  changeLanguage(lang:string){
    this._TranslationService.changeLang(lang);
  }

}
