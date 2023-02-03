import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
    return this.http.get<Imobiler[]>(host+"/immobilier?available=true");
  }

  getAchat():Observable<Imobiler[]> {
    let host = environment.unreachableHost;
    return this.http.get<Imobiler[]>(host+"/imobilier/achat");
  }
  getLocation():Observable<Imobiler[]> {
    let host = environment.host;
    return this.http.get<Imobiler[]>(host+"/immobilier/location");
  }

  delete(id: any) {
    let host = environment.unreachableHost;
    return this.http.get(host+"/imobilier/delete/"+id)
  }
  updateStatus(data: any) {
    let host = environment.unreachableHost;
    return this.http.post(host + '/imobilier/updateStatus', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  add(data:any){
    let host = environment.unreachableHost;
    return this.http.post(host+
      "/imobilier/add", data, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }

  getImobilier(id:number):Observable<Imobiler>{
    return this.http.get<Imobiler>(environment.host+"/immobilier/"+id)
  }
}




