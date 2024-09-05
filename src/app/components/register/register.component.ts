import { Component, inject, OnDestroy } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy{

  constructor(private toastr: ToastrService){} // غيرت طريقةالانجكت للعلم بالشئ
  private _AuthService = inject(AuthService);
  private _FormBuilder = inject(FormBuilder);
  private _Router = inject(Router);


  // msgError:string = '';

  registerSubscription!:Subscription;
  isLoading:boolean = false;

  registerForm:FormGroup = this._FormBuilder.group({
    name:[null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email:[null, [Validators.required, Validators.email]],
    password:[null, [Validators.required, Validators.pattern(/^.{6,}$/)]],
    rePassword:[null, [Validators.required]],
    phone:[null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  },{validators:this.confirmPassword});


  confirmPassword(group: AbstractControl){
    if(group.get('password')?.value === group.get('rePassword')?.value){
      return null;
    }else{
      return {mismatch:true};
    }
  }
  
  registerSubmit():void{
    if(this.registerForm.valid){
      this.isLoading = true;
      this.registerSubscription = this._AuthService.setRegisterData(this.registerForm.value).subscribe({
        next:(res)=>
          {
            // console.log(res.message);
            if(res.message == 'success'){
            this.toastr.success(res.message,'',{timeOut: 1000});
              this.isLoading = false;
              setTimeout(() => {
                this._Router.navigate(['/login']);
              }, 1000);
            }
          },
        error:(err:HttpErrorResponse)=>
          {
            // this.msgError = err.error.message;
            this.toastr.error(err.error.message,'',{timeOut: 3000});
            this.isLoading = false;
          },
      })
    }
  }

  ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe();
  }
  
}









































  // registerForm: FormGroup = new FormGroup({
  //   name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   password: new FormControl(null, [Validators.required, Validators.pattern(/^.{6,}$/)]),
  //   rePassword: new FormControl(null, [Validators.required]),
  //   phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  // },this.confirmPassword);