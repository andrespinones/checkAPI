import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Api } from '../models/apis';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  readonly APIUrl = 'http://localhost:8080/api';
  
  readonly token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNjUxMjA2NjQ0fQ.TJgprpw4KKdJ6wVku9uecwfMhQFNaucvF2uBgr6Lr6I'
  getAllApis(): Observable<Api[]>{
    return this.http.get<Api[]>(this.APIUrl+'/apis',{headers: new HttpHeaders({
      'Content-Type': 'application/json', 'access-token':this.token}
      )}
    );
  }

}