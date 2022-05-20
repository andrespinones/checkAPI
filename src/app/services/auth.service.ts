import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpBackend} from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { Api } from '../models/apis';
import { PopupUtils } from '@azure/msal-browser';
import { AnyForUntypedForms } from '@angular/forms';
import { User } from '../models/user';
import { AuthResponseData } from '../auth-response-data';


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
    return this.httpclient.post<AuthResponseData>(this.APIUrl+'/auth',{ email:email});
  }

  handleUser(response:AuthResponseData){
    console.log(response.email)
    //meter el objeto dentro de un key 
    const user = new User(
      response.email,
      response.token,
      response.role,
      //en caso de que usemos un token que expira 
      response.expirationDate,
      //para cuando agreguemos las apiKeys de cada API o algo por el estilo
      response.apiKey
    );
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

}


