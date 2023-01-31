import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Imobiler} from "../Model/Imobiler";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor( private http:HttpClient) { }

  allImobilier():Observable<Imobiler[]>{
    let host = environment.host;
    return this.http.get<Imobiler[]>(host+"/immobilier");
  }
}




