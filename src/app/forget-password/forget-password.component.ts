import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {


  ForgotPasswordForm:any = FormGroup;
  responseMessage:any;

  formErrors : { [char: string]: string } = {
    'email': ''
  } as const;

  validationMessages : any = {
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    }
  };


  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
    public dialogRef:MatDialogRef<ForgetPasswordComponent>,
    private ngService:NgxSpinnerService,
    private router:Router,
    private snackBar:SnackbarService) { }

  ngOnInit(): void {
    this.ForgotPasswordForm = this.formBuilder.group({
      email:[null, [Validators.required, Validators.email, Validators.pattern(GlobalConstants.emailRegex)]]

    })
    this.ForgotPasswordForm.valueChanges
    .subscribe((data: any) => this.onValueChanged(data));

  this.onValueChanged(); // (re)set validation messages now

  }
  onValueChanged(data?: any) {
    if (!this.ForgotPasswordForm) { return; }
    const form = this.ForgotPasswordForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)

        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  handelSubmit(){
    this.ngService.show();
    var formData = this.ForgotPasswordForm.value;
    var data = {
      email : formData.email
    }

    this.userService.forgotPassword(data).subscribe((response:any)=>{
      this.ngService.hide();
      this.dialogRef.close();
      localStorage.setItem('token', response.token);
      this.router.navigate(['/cafe/dashboard']);
    },(error)=>{
      this.ngService.hide();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBar.openSnackbar(this.responseMessage, GlobalConstants.error);
      console.log(this.responseMessage, GlobalConstants.error);
    }
    )
  }



}
