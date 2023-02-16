import { FileHandle } from './../Model/file-handle.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-imo-images',
  templateUrl: './show-imo-images.component.html',
  styleUrls: ['./show-imo-images.component.css']
})
export class ShowImoImagesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    this.receiveImages();
  }

  receiveImages(){
    console.log(this.data);
  }

}
