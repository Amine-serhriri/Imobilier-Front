import { Router } from '@angular/router';
import { GlobalConstants } from './../shared/global-constants';
import { SnackbarService } from './../services/snackbar.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from './../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm:any = FormGroup;
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
              public dialogRef:MatDialogRef<LoginComponent>,
              private router:Router,
              private spinner:NgxSpinnerService,
              private snackBar:SnackbarService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[null, [Validators.required, Validators.email, Validators.pattern(GlobalConstants.emailRegex)]],
      password:[null, [Validators.required]]


    })
    this.loginForm.valueChanges
      .subscribe((data: any) => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now

  }
  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
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
    this.spinner.show();
    var formData = this.loginForm.value;
    var data = {
      email: formData.email,
      password: formData.password
    }
  console.log(data)
    this.userService.login(data).subscribe((response:any)=>{
      this.spinner.hide();
      this.dialogRef.close();
      console.log("1")
      localStorage.setItem('token', response.token);
      console.log("2")
      this.router.navigate(['/cafe/dashboard']);
    }, (error)=>{
      this.spinner.hide();
      console.log("error")
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBar.openSnackbar(this.responseMessage, GlobalConstants.error)
      console.log(this.responseMessage, GlobalConstants.error);
    })
  }

}
