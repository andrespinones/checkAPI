import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpBackend} from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { User } from '../models/user.model';
import { AuthResponseData } from '../auth-response-data';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root' 
})
export class AuthService {
  private httpclient: HttpClient;
  
  constructor(private httpBackend: HttpBackend, private router:Router) {
    this.httpclient = new HttpClient(httpBackend);
  }
  //valores hardcodeados del endpoint y el token solo para pruebas
  readonly APIUrl = 'http://localhost:8080/api';  //valores hardcodeados del endpoint y el token solo para pruebas^^

  silentLogin(email:string){
    return this.httpclient.post<AuthResponseData>(this.APIUrl+'/auth',{ email:email});
  }

  handleUser(response:AuthResponseData){
    //meter el objeto dentro de un key 
    const user = new User(
      response.email,
      response.token,
      response.role,
      response.expirationDate,
      response.apiKey,
      response.userID
    );
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.router.navigateByUrl('home')
  }
}


