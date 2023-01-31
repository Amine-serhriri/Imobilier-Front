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
  cards$?:Observable<AppDataState<Imobiler[]>>
  readonly DataStateEnum=DataStateEnum

  /** Based on the screen size, switch from standard to one column per row */


  constructor(private breakpointObserver: BreakpointObserver,
              private DashboardService : DashboardService) {}

  ngOnInit(): void {
    this.cards$=this.DashboardService.allImobilier()
      .pipe(
        map((data)=>({dataState:DataStateEnum.LOADED,data:data})),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err => of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))

      )
  }

}
