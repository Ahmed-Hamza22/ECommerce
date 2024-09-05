import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  private _ActivatedRoute = inject(ActivatedRoute);
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

  orderSubmit(): void{
    this._OrdersService.checkOut(this.cartId, this.orderForm.value).subscribe({
      next:(res)=>{
        // console.log(res);
        this.isLoading = true;
        if(res.status === 'success'){
          window.open(res.session.url,'_self');    // res.session.url;  stripe url 
        }
      }
    });
    }


  }

