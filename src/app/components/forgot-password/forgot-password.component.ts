import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

private _AuthService = inject(AuthService);
private _Router = inject(Router);
private toastr = inject(ToastrService);

isLoading:boolean = false;
verifyEmailSubscription!:Subscription;
verifyCodeSubscription!:Subscription;
resetPasswordSubscription!:Subscription;

step: number = 1;

userEmail:string = '';

verifyEmail:FormGroup = new FormGroup({
  email: new FormControl(null, [Validators.required, Validators.email])
});

verifyCode:FormGroup = new FormGroup({
  resetCode: new FormControl(null, [Validators.required])
});

resetPassword:FormGroup = new FormGroup({
  email: new FormControl(null, [Validators.required, Validators.email]),
  newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^.{6,}$/)])
});
  

forgotPassSubmit():void{
  let userEmailValue = this.verifyEmail.get('email')?.value;
  this.resetPassword.get('email')?.patchValue(userEmailValue);
  
  if(this.verifyEmail.valid){
      this.isLoading = true;
      this.verifyEmailSubscription = this._AuthService.forgotPassword(this.verifyEmail.value).subscribe({
        next:(res)=>
          {
            // console.log(res);
            if(res.statusMsg == 'success'){
              this.toastr.success(res.message,'',{timeOut: 3000, progressBar:true});
              this.isLoading = false;
              this.step+=1;
            }
          },
        error:(err:HttpErrorResponse)=>
          {
            // console.log(err);
            this.toastr.error(err.error.message,'',{timeOut: 4000, progressBar:true});
            this.isLoading = false;
          },
      })
    }
}

sendCodeSubmit():void{
    if(this.verifyCode.valid){
      this.isLoading = true;
      this.verifyCodeSubscription = this._AuthService.sendCode(this.verifyCode.value).subscribe({
        next:(res)=>
          {
            // console.log(res);
            if(res.status == 'Success'){
              this.toastr.success(res.status,'',{timeOut: 3000,progressBar:true});
              this.isLoading = false;
              this.step+=1;
            }
          },
        error:(err:HttpErrorResponse)=>
          {
            // console.log(err);
            this.toastr.error(err.error.message,'',{timeOut: 4000,progressBar:true});
            this.isLoading = false;
          },
      })
    }
}

resetPasswordSubmit():void{
    if(this.resetPassword.valid){
      this.isLoading = true;
      this.resetPasswordSubscription = this._AuthService.resetPassword(this.resetPassword.value).subscribe({
        next:(res)=>
          {
            // console.log(res);
            this.toastr.success("Success",'',{timeOut: 3000, progressBar:true});
            this.isLoading = false;

            localStorage.setItem('userToken',res.token);
            this._AuthService.saveUserData();
            this._Router.navigate(['/home']);
          },
        error:(err:HttpErrorResponse)=>
          {
            // console.log(err);
            this.toastr.error(err.error.message,'',{timeOut: 4000, progressBar:true});
            this.isLoading = false;
          },
      })
    }
}

}
