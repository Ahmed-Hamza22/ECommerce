import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CashOrderComponent } from './components/cash-order/cash-order.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

export const routes: Routes = [
  {path:'',component:AuthLayoutComponent, canActivate:[loggedGuard],
    children:[
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent, title:'Login'},
    {path:'register',component:RegisterComponent, title:'Register'},
    {path:'forgot',component:ForgotPasswordComponent, title:'Reset Password'},
  ]},

  {path:'',component:MainLayoutComponent, canActivate:[authGuard],
    children:[
      {path:'',redirectTo:'home',pathMatch:'full'},
      {path:'home',component:HomeComponent, title:'Home'},
      {path:'brands',component:BrandsComponent, title:'Brands'},
      {path:'cart',component:CartComponent, title:'Cart'},
      {path:'categories',component:CategoriesComponent, title:'Categories'},
      // {path:'categoryDetails/:id',component:DetailsComponent, title:'Products'},
      {path:'products',component:ProductsComponent, title:'Products'},
      {path:'wishlist',component:WishlistComponent, title:'WishList'},
      {path:'productDetails/:id',component:DetailsComponent, title:'Products'},
      {path:'allorders',component:AllOrdersComponent, title:'Orders'},
      {path:'orders/:id',component:OrdersComponent, title:'Card Payment'},
      {path:'cashOrders/:id',component:CashOrderComponent, title:'Cash Payment'},
    ]
  },
  {path:'**',component:NotFoundComponent},
];
