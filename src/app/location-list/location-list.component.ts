import { Imobiler } from './../Model/Imobiler';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from './../shared/global-constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImagesProcessingService } from './../services/images-processing.service';
import { DashboardService } from './../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {


  dataSource : Imobiler[]= [];
  responseMessage: any;

  constructor(private dashbordService:DashboardService,
    private imagesService:ImagesProcessingService,
    private ngxService: NgxSpinnerService,
    private snackbar: SnackbarService,
    private router:Router) { }

  ngOnInit(): void {
    this.getAllAchats();
  }

  getAllAchats(){
    this.dashbordService.getLocation()
    .pipe(
      map((x:Imobiler[], i) => x.map((imobilier:Imobiler) => this.imagesService.createImages(imobilier)))
    )
    .subscribe((response: Imobiler[]) => {
      this.ngxService.hide();
      console.log(response)
      this.dataSource = response;
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
  ShowAchatDetails(id:number){
    this.router.navigate(['/achatDetails', {id:id}])
  }


}
