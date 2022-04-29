import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }


readonly APIUrl = 'http://localhost:8080/api';

  getAllApis(): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/apis');
  }

}