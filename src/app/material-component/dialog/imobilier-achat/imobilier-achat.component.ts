import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../../services/snackbar.service";
import {DashboardService} from "../../../services/dashboard.service";
import {GlobalConstants} from "../../../shared/global-constants";

@Component({
  selector: 'app-imobilier-achat',
  templateUrl: './imobilier-achat.component.html',
  styleUrls: ['./imobilier-achat.component.css']
})
export class ImobilierAchatComponent implements OnInit {
  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  productForm:any = FormGroup;
  dialogAction:any="Add";
  action:any="Add";
  responseMessage:any;
  categorys:any=[];
  fileName!:string;

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
              public dialogRef:MatDialogRef<ImobilierAchatComponent>,
              private snackbar: SnackbarService,
              private dashService:DashboardService) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      title:[null, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      adresse:[null, Validators.required],
      price:[0, Validators.required],
      description:[null, [Validators.minLength(5), Validators.maxLength(50)]],
      surface:[0,[Validators.required ,Validators.min]],
      rooms:[0,[Validators.required ,Validators.min]],
      ACHAT:"ACHAT",
      file:[this.fileName]
    })
    this.productForm.file = this.fileName;

    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.productForm.patchValue(this.dialogData.data);
    }



    this.productForm.valueChanges
      .subscribe((data: any) => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
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


  handelSubmit() {
    if (this.dialogAction === 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }

  private edit() {

  }

  private add() {
    var formData=this.productForm.value
    var data ={
      title :formData.title,
      description :formData.description,
      price :formData.price,
      surface :formData.surface,
      adresse :formData.adresse,
      rooms:formData.rooms,
      type :formData.ACHAT,
      available:true

    }
    console.log(data)
    this.dashService.add(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddProduct.emit();
      this.responseMessage = response.message;
      this.snackbar.openSnackbar(this.responseMessage, "Success");
    }, (error:any)=>{
      if(error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbar.openSnackbar(this.responseMessage, GlobalConstants.error);
    })
  }

  }

