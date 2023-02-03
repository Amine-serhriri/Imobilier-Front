import {Component, OnInit} from '@angular/core';
import {catchError, map, startWith} from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {DashboardService} from "../services/dashboard.service";
import {Imobiler} from "../Model/Imobiler";
import {Observable, of} from "rxjs";
import {AppDataState, DataStateEnum} from "../state/imobilier.state";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  cards!:Imobiler[]
  page:number=1
  count:number=0
  tableSize:number=3
  hidden = false;



  /** Based on the screen size, switch from standard to one column per row */


  constructor(private breakpointObserver: BreakpointObserver,
              private DashboardService : DashboardService) {}

  ngOnInit(): void {
    this.ListImmobilier()
  }


  ListImmobilier():void{
    this.DashboardService.allImobilier().subscribe(
      (data)=>{
        this.cards=data
      },error => {
        console.log(error)
      }
    )
  }
  onListDataChange(event:any){
    this.page=event
    this.ListImmobilier()
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value
    this.page=1
    this.ListImmobilier()
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
