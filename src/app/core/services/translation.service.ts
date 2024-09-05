import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, Renderer2, RendererFactory2, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private _TranslateService = inject(TranslateService);
  private _PLATFORM_ID = inject(PLATFORM_ID);
  // private _Renderer2 = inject(Renderer2);                    هيحصل ايرور عشان مينفعش استخدم الريندرر 2 في السيرفس بشكل مباشر.....الحل تحته
  // private _Renderer2 = inject(RendererFactory2).createRenderer(null,null)

  constructor() {

    if(isPlatformBrowser(this._PLATFORM_ID)){
      const savedLang = localStorage.getItem('lang');
      this._TranslateService.setDefaultLang('en');
      if(savedLang){
        this._TranslateService.use(savedLang);
      }
      this.changeDirection();
    }
  }


  changeDirection():void {
    const savedLang = localStorage.getItem('lang');
    if(localStorage.getItem('lang') === 'en'){
      document.documentElement.dir = 'ltr';
      // this._Renderer2.setAttribute(document.documentElement,'dir','ltr');
    }
    else if (localStorage.getItem('lang') === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      // this._Renderer2.setAttribute(document.documentElement,'dir','rtl');
      // this._Renderer2.setAttribute(document.documentElement,'lang','ar');
    }
  }

  changeLang(lang: string){
    if(isPlatformBrowser(this._PLATFORM_ID)){
      localStorage.setItem('lang', lang);
      this._TranslateService.use(lang);
      this.changeDirection();
    }
  }

}
