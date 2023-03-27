import { SnackbarService } from './../services/snackbar.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialogRef } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.css']
})

export class VenteComponent implements OnInit {

  venteForm:any = FormGroup;
  formErrors : { [char: string]: string } = {
    'message': ''
  } as const;

  validationMessages : any = {
    'message': {
      'required':      'message is required.'
    }
  };


  constructor(private formBuilder:FormBuilder,


              private ngService:NgxSpinnerService,
              @Inject(DOCUMENT) private document: Document,
              private snackBar:SnackbarService) { }

  ngOnInit(): void {
    this.venteForm = this.formBuilder.group({
      message:[null, [Validators.required]],
      state:[null, [Validators.required]],
      property:[null, [Validators.required]]

    })
    this.venteForm.valueChanges
      .subscribe((data: any) => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now

  }
  onValueChanged(data?: any) {
    if (!this.venteForm) { return; }
    const form = this.venteForm;
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
    console.log(this.venteForm.value);
    this.document.location.href = "https://web.whatsapp.com/send?phone=+212634488400&text=Hello, i'm a "
    +this.venteForm.value.state+", and i have a  "+this.venteForm.value.property+". My message is : "+this.venteForm.value.message;
  }
}
