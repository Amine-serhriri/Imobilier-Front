import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../services/dashboard.service";
import {Imobiler} from "../Model/Imobiler";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  immobilier!:Imobiler

  constructor(private dashService:DashboardService) { }

  ngOnInit(): void {
    this.dashService.getImobilier(1).subscribe(
      data=>{
        this.immobilier=data
      })
  }

}
