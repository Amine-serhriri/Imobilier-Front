import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../../services/snackbar.service";

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
    'name': '',
    'categoryId': '',
    'price': '',
    'description': '',
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
    'file' :{
      'required':      'file is required.'
    }
  };

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
              private formBuilder:FormBuilder,
              public dialogRef:MatDialogRef<ImobilierAchatComponent>,
              private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name:[null, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      categoryId:[null, Validators.required],
      price:[null, Validators.required],
      description:[null, [Validators.minLength(5), Validators.maxLength(50)]],
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

  }
}
