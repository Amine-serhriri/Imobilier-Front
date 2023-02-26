import { NgxSpinnerService } from 'ngx-spinner';
import { ShowImoImagesComponent } from './../../../show-imo-images/show-imo-images.component';
import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material/dialog";
import {SnackbarService} from "../../../services/snackbar.service";
import {DashboardService} from "../../../services/dashboard.service";
import {GlobalConstants} from "../../../shared/global-constants";
import {FileHandle} from "../../../Model/file-handle.model";
import {DomSanitizer} from "@angular/platform-browser";
import {Imobiler, Type} from "../../../Model/Imobiler";

@Component({
  selector: 'app-imobilier-location',
  templateUrl: './imobilier-location.component.html',
  styleUrls: ['./imobilier-location.component.css']
})
export class ImobilierLocationComponent implements OnInit {
  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  productForm:any = FormGroup;
  dialogAction:any="Add";
  action:any="Add";
  responseMessage:any;

  imoAchat:Imobiler={
  id:0,
  title:"",
  description :"" ,
  rooms:0,
  adresse:"",
  available:true,
  price:0,
  surface:0,
  Type : Type.LOCATION,
    imoAchatImages:[]
  }


  formErrors : { [char: string]: string } = {
    'title': '',
    'adresse': '',
    'price': '',
    'description': '',
    'surface':'',
    'rooms':'',
    'file': ''
  } as const;

  validationMessages : any = {
    'title': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 25 characters long.'
    },
    'adresse': {
      'required':      'adresse is required.'
    },
    'price': {
      'required':      'price is required.',
      'min'     :      'price must be at least 0 DH.'
    },
    'description': {
      'required':      'description is required.',
      'minlength':     'Name must be at least 5 characters long.',
      'maxlength':     'Name cannot be more than 50 characters long.'
    },
    'surface':{
      'required':'surface is required',

    },
    'rooms':{
      'required':'rooms is required',
      'min':'rooms must be at least 1 .'
    },
    'file' :{
      'required':      'file is required.'
    }
  };
  selected: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
              private formBuilder:FormBuilder,
              public dialogRef:MatDialogRef<ImobilierLocationComponent>,
              private snackbar: SnackbarService,
              private dashService:DashboardService,
              private sanitizer:DomSanitizer,
              private imagesdialog:MatDialog,
              private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      //this.productForm.patchValue(this.dialogData.data);
      this.imoAchat = this.dialogData.data;
      console.log(this.dialogData);

    }

  }
  onValueChanged(data?: any) {
    if (!this.productForm) { return; }
    const form = this.productForm;
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

  edit(){

  }



   add(imageAchatForm:NgForm) {
    console.log("add location ++++++++++")
    this.spinner.show();
    const imoAchatFormData = this.prepareFormData(this.imoAchat);
    this.dashService.addLocation(imoAchatFormData).subscribe((response:any)=>{
      this.spinner.hide();
      this.dialogRef.close();
      this.onAddProduct.emit();

      if (this.dialogData.action=== 'Add') {
        this.responseMessage = "Immobilier Added Successfully";
      } else if (this.dialogData.action=== 'Edit') {
        this.responseMessage = "Immobilier Updated Successfully";
      }
      this.snackbar.openSnackbar(this.responseMessage, "Success");
    }, (error:any)=>{
      this.spinner.hide();
      if(error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbar.openSnackbar(this.responseMessage, GlobalConstants.error);
    })
  }
  prepareFormData(Imobilier:Imobiler):FormData{
    const formdata=new FormData()
    formdata.append(
      'imoAchat',
      new Blob([JSON.stringify(Imobilier)],{type:'application/json'})
    );
    for (let i = 0; i < Imobilier.imoAchatImages.length; i++) {
      formdata.append(
        'file',
        Imobilier.imoAchatImages[i].file,
        Imobilier.imoAchatImages[i].file.name
      )
    }
    console.log(formdata)
    return formdata
  }

  onFileSelected(event: any) {
    if(event.target.files){
      const file=event.target.files[0]
      const fileHandle:FileHandle={
        file:file,
        url:this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.imoAchat.imoAchatImages.push(fileHandle)
    }
  }


  fileDropped(fileHandle:any){
    console.log(fileHandle);
    this.imoAchat.imoAchatImages.push(fileHandle);
  }

  removeImgae(i: number) {
    this.imoAchat.imoAchatImages.splice(i,1)
  }

  showImage(imoAchat:Imobiler){
    this.imagesdialog.open(ShowImoImagesComponent);
  }
}

