import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../services/dashboard.service";
import {NgxSpinnerService} from "ngx-spinner";
import {SnackbarService} from "../services/snackbar.service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {GlobalConstants} from "../shared/global-constants";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ImobilierAchatComponent} from "../material-component/dialog/imobilier-achat/imobilier-achat.component";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  displayedColumns:string[] = [ 'title', 'adresse', 'description', 'price'];
  dataSource:any;
  responseMessage:any;


  constructor(private dialog:MatDialog,
              private dashbordService:DashboardService,
              private ngxService:NgxSpinnerService,
              private snackbar:SnackbarService,
              private router:Router) { }

  ngOnInit(): void {
    this.ngxService.show();
    this.tableData();
  }
  tableData(){
    this.dashbordService.getAchat().subscribe((response:any)=>{
      this.ngxService.hide();
      console.log(response)
      this.dataSource = new MatTableDataSource(response);
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


  applyFilter($event: KeyboardEvent) {
    // @ts-ignore
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  handeAddActions(){
    const dialogConf = new MatDialogConfig();
    dialogConf.data = {
      action : 'Add'
    }
    dialogConf.width = "850px";
    const dialogRef = this.dialog.open(ImobilierAchatComponent, dialogConf);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddProduct.subscribe((response)=>{
      this.tableData();
    })
  }


  handelEditActions(values:any){
    const dialogConf = new MatDialogConfig();
    dialogConf.data = {
      action : 'Edit',
      data:values
    }
    dialogConf.width = "850px";
    const dialogRef = this.dialog.open(ImobilierAchatComponent, dialogConf);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditProduct.subscribe((response)=>{
      this.tableData();
    })
  }

  handelDeleteActions(element:any) {

  }

  onChange(checked: boolean, id:any) {

  }
}
