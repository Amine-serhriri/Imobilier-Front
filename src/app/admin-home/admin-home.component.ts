import { ImagesProcessingService } from './../services/images-processing.service';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../services/dashboard.service";
import {NgxSpinnerService} from "ngx-spinner";
import {SnackbarService} from "../services/snackbar.service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {GlobalConstants} from "../shared/global-constants";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ImobilierAchatComponent} from "../material-component/dialog/imobilier-achat/imobilier-achat.component";
import {ConfirmationComponent} from "../material-component/dialog/confirmation/confirmation.component";

import {ImageComponent} from "../image/image.component";
import {DatasharingService} from "../services/datasharing.service";
import { Imobiler } from '../Model/Imobiler';
import { ShowImoImagesComponent } from '../show-imo-images/show-imo-images.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  displayedColumns: string[] = ['title', 'adresse', 'description', 'price', 'surface', 'rooms', 'type','edit','images'];
  dataSource: any;
  responseMessage: any;


  constructor(private dialog: MatDialog,
              private dashbordService: DashboardService,
              private ngxService: NgxSpinnerService,
              private snackbar: SnackbarService,
              private router: Router,
              private datasharing:DatasharingService,
              private imagesdialog:MatDialog,
              private imagesService:ImagesProcessingService) {
  }

  ngOnInit(): void {
    this.ngxService.show();
    this.tableData();
  }

  tableData() {
    this.dashbordService.getAchat()
    .pipe(
      map((x:Imobiler[], i) => x.map((imobilier:Imobiler) => this.imagesService.createImages(imobilier)))
    )
    .subscribe((response: any) => {
      this.ngxService.hide();
      console.log(response)
      this.dataSource = new MatTableDataSource(response);
    }, (error) => {
      this.ngxService.hide();
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbar.openSnackbar(this.responseMessage, GlobalConstants.error);
    })
  }


  applyFilter($event: KeyboardEvent) {
    // @ts-ignore
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handeAddActions() {
    const dialogConf = new MatDialogConfig();
    dialogConf.data = {
      action: 'Add'
    }
    dialogConf.width = "1500px";
    const dialogRef = this.dialog.open(ImobilierAchatComponent, dialogConf);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddProduct.subscribe((response) => {
      this.tableData();
    })
  }


  handelEditActions(values: any) {
    console.log(values)
    const dialogConf = new MatDialogConfig();
    dialogConf.data = {
      action: 'Edit',
      data: values
    }
    console.log(dialogConf.data.action)
    console.log(dialogConf.data.data)
    dialogConf.width = "1500px";
    const dialogRef = this.dialog.open(ImobilierAchatComponent, dialogConf);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditProduct.subscribe((response) => {
      this.tableData();
    })
  }

  handelDeleteActions(values:any){
    const dialogConfi = new MatDialogConfig();
    dialogConfi.data = {
      message:'delete '+values.title+' product'
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfi);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
      this.ngxService.show();
      this.deleteProduct(values.id);
      dialogRef.close();
    })
  }
  deleteProduct(id:any){
    console.log("1.1")
    this.dashbordService.deleteAchat(id).subscribe((response:any)=>{
      console.log("delete 1");
      this.ngxService.hide();
      this.tableData();
      this.responseMessage = response?.message;
      this.snackbar.openSnackbar(this.responseMessage, "Success");
    },(error)=>{
      this.ngxService.hide();
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbar.openSnackbar(this.responseMessage, GlobalConstants.error);
    })
  }

  onChange(status:boolean, id:any){
    console.log(id+"id", status+"status")
    var data={
      available:status.toString(),
      id:id
    }
    console.log(data.available+"data change");
    this.dashbordService.updateStatus(data).subscribe((response:any)=>{
      this.ngxService.hide();
      this.responseMessage = response?.message;
      this.snackbar.openSnackbar(this.responseMessage, "Success");
      this.tableData()
    },(error)=>{
      this.ngxService.hide();
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbar.openSnackbar(this.responseMessage, GlobalConstants.error);

    })
  }

  showImage(imoAchat:Imobiler){
    console.log(imoAchat);
    this.imagesdialog.open(ShowImoImagesComponent, {
      data :{
        images: imoAchat.imoAchatImages
      },
      height: '500px',
      width: '800px'
    });
  }


  handleImage(id:any) {
    var data={
      id:id
    }
    console.log(data)
    this.datasharing.changeId(data.id)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";

    this.dialog.open(ImageComponent, dialogConfig);
  }
}
