import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2'; // دي عشان اللي انا مستخدمها في ال اتش تي ام ال انما لو هستخدم الاتريبيوت مش هستخدم دي
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,SweetAlert2Module,RouterLink,TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private _CartService = inject(CartService);
  private _ToastrService = inject(ToastrService);

  cartDetails: ICart = {} as ICart; 


  ngOnInit(): void {
    this._CartService.getProductsCart().subscribe(
      {
        next:(res)=>{
          this.cartDetails = res.data;
        }
      });
  }

  removeItem(id:string): void {
    this._CartService.deleteSpecificCartItem(id).subscribe({
      next:(res)=>{
        // console.log(res);
        this.cartDetails = res.data;
        this._CartService.cartCounter.next(res.numOfCartItems);
        this._ToastrService.success('product have been removed',"Fresh Cart");
      }
    });
  }

  updateCounter(id:string, count:number ): void {
    // if(count>0){...}else{removeItem(id)}
    this._CartService.updateProductQuantity(id, count).subscribe({
      next:(res)=>{
        // console.log(res);
        this.cartDetails = res.data;
        this._ToastrService.success('product quantity have been modified',"Fresh Cart");
      }
    });
  }

  clearCart(): void{
    this._CartService.deleteAllCart().subscribe({
      next:(res)=>{
        // console.log(res);
        if(res.message === "success"){
          this._ToastrService.info('Your cart is empty now',"Fresh Cart"); 
          this.cartDetails = {} as ICart;
          this._CartService.cartCounter.next(res.numOfCartItems);
        }
      }
    });
  }




























  clearAllSweetAlertFunction(){
    Swal.fire({
      title: 'Are You Sure?',
      text: 'Your will remove all products from your cart!',
      icon: 'warning',
      confirmButtonText: 'Yes, clear it',
      confirmButtonColor: "#DD6B55",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.clearCart(); // تنفيذ الوظيفة المطلوبة
      }});
  }

}
