import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../services/dashboard.service";
import {Imobiler} from "../Model/Imobiler";
import {Location} from "@angular/common";
import {AchatDetail} from "../Model/achatDetails";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class 
DetailsComponent implements OnInit {
  immobilier!:any
  achatDetail!:AchatDetail
  datasource!:any
  imageUrl!:string


  constructor(private dashService:DashboardService,
              private location:Location,) { }

  ngOnInit(): void {
    /*this.dashService.achatdetail(15).subscribe(
      (data:any)=>{
        console.log(data)

        let achatDetail=new AchatDetail(data)
        const reader = new FileReader();
        reader.readAsArrayBuffer(achatDetail.image);
        reader.onloadend = () => {
          this.imageUrl = btoa(
            new Uint8Array(reader.result as ArrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
          );

          console.log(achatDetail)
          this.immobilier = achatDetail
        }
      })




*/

  /*goBack() {
    this.location.back();
  }*/
  }
}

