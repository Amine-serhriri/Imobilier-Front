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
    return this.http.get<Imobiler[]>(host+"/imoAchat/achat");
  }
  getAchatAdmin():Observable<Imobiler[]> {
    let host = environment.unreachableHost;
    return this.http.get<Imobiler[]>(host+"/imoAchat/achatAdmin");
  }
  getLocation():Observable<Imobiler[]> {
    let host = environment.unreachableHost;
    return this.http.get<Imobiler[]>(host+"/imoAchat/location");
  }


  deleteAchat(id: any) {
    let host = environment.unreachableHost;
    return this.http.get(host+"/imoAchat/delete/"+id)
  }
    updateStatus(data: any) {
    let host = environment.unreachableHost;
    return this.http.post(host + '/imoAchat/updateStatus', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  add(data:FormData){
    let host = environment.unreachableHost;
    return this.http.post<Imobiler>(host+
      "/imoAchat/addAchat", data)
  }
  addLocation(data:FormData){
    let host = environment.unreachableHost;
    return this.http.post<Imobiler>(host+
      "/imoAchat/addLocation", data)
  }


  uploadImage(formData: any) {
    return this.http.post(environment.unreachableHost+"/imobilier/upload/image",formData)
  }
  /*achatdetail(id:number){
    let host = environment.unreachableHost;
    return this.http.get(host+"/imobilier/achatDetails/"+id)
  }
*/
  achatDetails(id:any){
    let host = environment.unreachableHost;
    return this.http.get<Imobiler>(host+"/imoAchat/getAchatDetailsById/"+id)
  }

}




