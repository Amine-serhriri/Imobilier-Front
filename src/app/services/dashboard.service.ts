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
    let host = environment.unreachableHost;
    return this.http.get<Imobiler[]>(host+"/imobilier/get");
  }

  getAchat():Observable<Imobiler[]> {
    let host = environment.unreachableHost;
    return this.http.get<Imobiler[]>(host+"/achat");
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
  add(data:FormData){
    let host = environment.unreachableHost;
    return this.http.post<Imobiler>(host+
      "/addAchat", data)
  }


  uploadImage(formData: any) {
    return this.http.post(environment.unreachableHost+"/imobilier/upload/image",formData)
  }
  achatdetail(id:number){
    let host = environment.unreachableHost;
    return this.http.get(host+"/imobilier/achatDetails/"+id)
  }

}




