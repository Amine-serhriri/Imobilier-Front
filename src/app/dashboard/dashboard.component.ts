import { DashboardService } from './../services/dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  nbrA!:any;
  nbrL!:any;

  typee!:any;
  constructor(private DashboardService : DashboardService) { }

  ngOnInit(): void {
    this.detailsAchat();  
    this.detailsLocation();

  }
  detailsAchat(){
    this.DashboardService.getDetails("ACHAT").subscribe((response:any)=>{
      this.nbrA=response;
    })
  }

  detailsLocation(){
    this.DashboardService.getDetails("LOCATION").subscribe((response:any)=>{
      this.nbrL=response;
    })
  }



}
