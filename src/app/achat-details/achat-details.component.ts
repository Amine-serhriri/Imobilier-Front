import { Imobiler } from './../Model/Imobiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-achat-details',
  templateUrl: './achat-details.component.html',
  styleUrls: ['./achat-details.component.css']
})
export class AchatDetailsComponent implements OnInit {
  message="ACHETER UN APPARTEMENT OU UNE VILLA"
  achat!:Imobiler;
  selectedAchatIndex=0
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.achat = this.activatedRoute.snapshot.data['imoAchat']; // the variable between '' must be with the same name mentioned in the resolver
    console.log(this.achat)
  }

  changeIndex(i:number){
    this.selectedAchatIndex = i;
  }

}
