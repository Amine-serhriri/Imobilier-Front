import { Injectable } from '@angular/core';
import {Feedback} from "../Model/feedback";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) {
  }

  submitFeedBack(feedback: Feedback): Observable<Feedback> {
    let host = environment.host;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<Feedback>(host + "/feedback", feedback, httpOptions)

  }
}
