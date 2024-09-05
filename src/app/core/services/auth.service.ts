import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _Router = inject(Router);
  userData:any = null;

  // private readonly _HttpClient = inject(HttpClient)
  constructor(private _HttpClient:HttpClient) {}

  setRegisterData(registerObject:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,registerObject)
  }

  setLoginData(LoginObject:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,LoginObject)
  }

  saveUserData():void{
    if (localStorage.getItem('userToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
    }
  }


  logout() :void{
    localStorage.removeItem('userToken');
    this.userData = null;
    this._Router.navigate(['/login']);
  }


  forgotPassword(email:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,email)
  }

  sendCode(code:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,code)
  }

  resetPassword(userNewData:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,userNewData)
  }

}
