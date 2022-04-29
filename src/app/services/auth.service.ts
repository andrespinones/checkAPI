import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpBackend} from '@angular/common/http'
import { Observable } from 'rxjs'
import { Api } from '../models/apis';
import { PopupUtils } from '@azure/msal-browser';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpclient: HttpClient;
  constructor(private httpBackend: HttpBackend) {
    this.httpclient = new HttpClient(httpBackend);
  }
  //valores hardcodeados del endpoint y el token solo para pruebas
  readonly APIUrl = 'http://localhost:8080/api';
  readonly token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNjUxMjA2NjQ0fQ.TJgprpw4KKdJ6wVku9uecwfMhQFNaucvF2uBgr6Lr6I'
  //valores hardcodeados del endpoint y el token solo para pruebas^^
  getToken(){
    return this.httpclient.post<any>(this.APIUrl+'/auth',{ email:'A01138740@tec.mx'});
  }

}


