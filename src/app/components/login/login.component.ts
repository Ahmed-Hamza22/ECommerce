import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy{

  constructor(private toastr: ToastrService){}
  private _AuthService = inject(AuthService);
  private _FormBuilder = inject(FormBuilder);
  private _Router = inject(Router);

  loginSubscription!:Subscription;
  isLoading = false;

  loginForm:FormGroup = this._FormBuilder.group({
    email:[null, [Validators.required, Validators.email]],
    password:[null, [Validators.required]],
  });


  loginSubmit(){
    if(this.loginForm.valid){
      this.isLoading = true;
      this.loginSubscription = this._AuthService.setLoginData(this.loginForm.value).subscribe({
        next:(res)=>{
          if(res.message == 'success'){
            localStorage.setItem('userToken',res.token);
            this._AuthService.saveUserData();
            this.toastr.success(res.message,'',{timeOut: 2000});
              this.isLoading = false;
              setTimeout(() => {
                this._Router.navigate(['/home']);
              }, 1000);
          }
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err)
          this.toastr.error(err.error.message,'',{timeOut: 3000});
          this.isLoading = false;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }

}
