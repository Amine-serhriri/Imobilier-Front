import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import {SnackbarService} from "../services/snackbar.service";
import {GlobalConstants} from "../shared/global-constants";
import {DashboardService} from "../services/dashboard.service";
import {DatasharingService} from "../services/datasharing.service";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  loginForm!: FormGroup;
  file:any
  file2:any
  id!:number

  constructor(private fb:FormBuilder,
              public dialogRef:MatDialogRef<ImageComponent>,
              private ngService:NgxSpinnerService,
              private router:Router,
              private snackBar:SnackbarService,
              private service:DashboardService,
              private dataSharing:DatasharingService,
              @Inject(MAT_DIALOG_DATA)public dialog:any) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      image1:[null, [Validators.required]],
      image2:[null, [Validators.required]]
    })

    this.dataSharing.currentId.subscribe(id=>{
      this.id=id
    })



  }
  handelSubmit() {
    this.ngService.show()
    var formData =new FormData()
    formData.set("image",this.file)
    formData.set("image2",this.file2)
    formData.set("id",this.id.toString())

    this.service.uploadImage(formData).subscribe((resp)=>{
      this.ngService.hide();
      this.dialogRef.close()
    })


  }

  getFile(event: any) {
    this.file=event.target.files[0]
    console.log("file :",this.file.name)

  }

  getFile2(event: any) {
    this.file2=event.target.files[0]
    console.log("file2 :",this.file2.name,"/",this.id)

  }
}
