import { Component, OnInit } from '@angular/core';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.css']
})

export class VenteComponent implements OnInit {
  foods: Food[] = [
    {value: "I'm a property owner", viewValue: "I'm a property owner"},
    {value: "I'm a real estate agent", viewValue: "I'm a real estate agent"}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
