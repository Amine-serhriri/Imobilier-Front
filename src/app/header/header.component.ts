import { Component, OnInit } from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {WtspComponent} from "../wtsp/wtsp.component";

@Component({
  selector: 'app-header1',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  message=""
  constructor(public dialog:MatDialog,
              private userService:UserService,
              private router:Router) { }

  ngOnInit(): void {

  }

  openLoginForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(LoginComponent, dialogConfig);
  }
  Whatsapp() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(WtspComponent, dialogConfig);
  }
}
