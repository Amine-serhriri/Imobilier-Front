import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  login(data: any) {
    let host=environment.unreachableHost
    return this.http.post(host + '/user/login', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  forgotPassword(data: any) {
    let host=environment.unreachableHost
    return this.http.post(host + '/user/forgotPassword', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  checkToken() {
    let host=environment.unreachableHost
    return this.http.get(host + '/user/checkToken');
  }

  chnagePassword(data: any) {
    let host=environment.unreachableHost
    return this.http.post(host + '/user/changePassword', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
