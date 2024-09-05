import { Component, inject, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-cash-order',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './cash-order.component.html',
  styleUrl: './cash-order.component.scss'
})
export class CashOrderComponent implements OnInit{

  private _ActivatedRoute = inject(ActivatedRoute);
  private _Router = inject(Router);
  private _OrdersService = inject(OrdersService);

  cartId:string | null = "";


  isLoading:boolean = false;

  orderForm:FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl(null, [Validators.required, Validators.minLength(3)]),
  });

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.cartId = params.get('id');
      }
    })
  }


  cashOrderSubmit(): void{
    this._OrdersService.cashCheckOut(this.cartId, this.orderForm.value).subscribe({
      next:(res)=>{
        // console.log(res);
        this.isLoading = true;
        if(res.status === 'success'){
          this._Router.navigate(['/allorders']);
        }
      }
    });
    }

}
