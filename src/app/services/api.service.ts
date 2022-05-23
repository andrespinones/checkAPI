import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpBackend} from '@angular/common/http'
import { Observable } from 'rxjs'
import { Api } from '../models/apis';
import { Category } from '../models/category';
import { Endpoint } from '../models/endpoint';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpclient: HttpClient;
  constructor(private httpBackend: HttpBackend) {
    this.httpclient = new HttpClient(httpBackend);
  }
  //ENDPOINTS
  readonly APIURL = 'http://localhost:8080/api';
  //valores hardcodeados del endpoint y el token solo para pruebas
  readonly token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNjUxMjA2NjQ0fQ.TJgprpw4KKdJ6wVku9uecwfMhQFNaucvF2uBgr6Lr6I'
  //valores hardcodeados del endpoint y el token solo para pruebas^^
  getAllApis(): Observable<Api[]>{ //must have userID: any as parameter
    return this.httpclient.get<Api[]>(this.APIURL+'/apis/' + 2,{headers: new HttpHeaders({ //hardcodeado
      'Content-Type': 'application/json', 'access-token':this.token}
      )}
    );
  }

  getAllCategories(){
    return this.httpclient.get<Category[]>(this.APIURL+'/categories',{headers: new HttpHeaders({
      'Content-Type': 'application/json', 'access-token':this.token}
      )}
      );
  }

  getGroupsbyID(apiID:any){
    return this.httpclient.get<any>(this.APIURL+'/groups/'+ apiID,{headers: new HttpHeaders({
      'Content-Type': 'application/json', 'access-token':this.token}
      )}
      );
  }
  getApibyID(apiID:any){
    return this.httpclient.get<any>(this.APIURL+'/api/'+ apiID,{headers: new HttpHeaders({
      'Content-Type': 'application/json', 'access-token':this.token}
      )}
      );
  }
  getEndpointbyID(endpointID:any){
    return this.httpclient.get<Endpoint>(this.APIURL+'/endpoint/'+ endpointID,{headers: new HttpHeaders({
      'Content-Type': 'application/json', 'access-token':this.token}
      )}
      );
  }

  getAPIsByCategory(categoryID: number): Observable<Api[]>{
    return this.httpclient.get<Api[]>(this.APIURL+'/categories/'+ categoryID,{headers: new HttpHeaders({
      'Content-Type': 'application/json', 'access-token':this.token}
      )}
      );
  }

  getAllUsers(){
    return this.httpclient.get<Client[]>(this.APIURL+'/users',{headers: new HttpHeaders({
      'Content-Type': 'application/json', 'access-token':this.token}
      )}
      );
  }

  updateUserRole(val: any){
    return this.httpclient.put<Client[]>(this.APIURL+'/userUpdate' , val,{headers: new HttpHeaders({
      'Content-Type': 'application/json', 'access-token':this.token}
      )}
      );
  }
}
