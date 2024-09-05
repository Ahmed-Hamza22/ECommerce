import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { jwtDecode } from 'jwt-decode';
import { IAllOrders } from '../../core/interfaces/iall-orders';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit{

  private _OrdersService = inject(OrdersService);
  userDataFromToke:any = jwtDecode(localStorage.getItem('userToken')!);
  UserId:string = this.userDataFromToke.id;
  
  allOrdersList!:IAllOrders [];

  ngOnInit(): void {
    this._OrdersService.showCompleteOrders(this.UserId).subscribe({
      next:(res)=>{
        console.log(res);
        this.allOrdersList = res;
      }
    })
  }

}