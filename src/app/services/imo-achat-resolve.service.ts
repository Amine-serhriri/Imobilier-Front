import { ImagesProcessingService } from './images-processing.service';
import { DashboardService } from './dashboard.service';
import { Imobiler, Type } from './../Model/Imobiler';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImoAchatResolveService implements Resolve<Imobiler>{

  constructor(private dashboardService: DashboardService,
    private imagesService: ImagesProcessingService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<Imobiler>  {
    const id = route.paramMap.get("id");

    if (id) {
      return this.dashboardService.achatDetails(id)
      .pipe
      (map(p=> this.imagesService.createImages(p)
      ))
      ;
    } else {
      return of(this.getImoAchatDetails());
    }
  }

  getImoAchatDetails(){
    return {
      title:"",
      description :"" ,
      rooms:0,
      adresse:"",
      available:true,
      price:0,
      surface:0,
      Type : Type.ACHAT,
      imoAchatImages:[]
    }
  }
}
