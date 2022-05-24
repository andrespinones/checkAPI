import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpBackend} from '@angular/common/http'
import { Observable } from 'rxjs'
import { Api } from '../models/apis';

export interface AuthResponseData{
  email: string;
  token: string;
  role: string;
  apiKey: string;
}

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

  silentLogin(email:string){
    console.log('flag');
    console.log(email);
    return this.httpclient.post<AuthResponseData>(this.APIUrl+'/auth',{ email:email});
  }

  handleUser(){
    
  }

}


