import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpBackend} from '@angular/common/http'
import { Observable } from 'rxjs'
import { Api } from '../models/apis';
import { Category } from '../models/category';
import { Endpoint } from '../models/endpoint';
import { Client } from '../models/client';
import { Favorite } from '../models/favorite';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpclient: HttpClient;
  constructor(private httpBackend: HttpBackend) {
    this.httpclient = new HttpClient(httpBackend);
  }
  currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  //ENDPOINTS
  readonly APIURL = 'http://localhost:8080/api';
  //valores hardcodeados del endpoint y el token solo para pruebas
  readonly token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNjUxMjA2NjQ0fQ.TJgprpw4KKdJ6wVku9uecwfMhQFNaucvF2uBgr6Lr6I'
  //valores hardcodeados del endpoint y el token solo para pruebas^^
  getAllApis(): Observable<Api[]>{ //must have userID: any as parameter
    let id = this.currentUser.userID
    return this.httpclient.get<Api[]>(this.APIURL+'/apis/' + id,{headers: new HttpHeaders({ //hardcodeado
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
  getApibyID(apiID:number){
    return this.httpclient.get<Api[]>(this.APIURL+'/api/'+ apiID,{headers: new HttpHeaders({
      'Content-Type': 'application/json', 'access-token':this.token}
      )}
      );
  }
  getEndpointbyID(endpointID:number){
    return this.httpclient.get<Endpoint[]>(this.APIURL+'/endpoint/'+ endpointID,{headers: new HttpHeaders({
      'Content-Type': 'application/json', 'access-token':this.token}
      )}
      );
  }

  getAPIsByCategory(categoryID: number, userID:number): Observable<Api[]>{ //must have userID: any as a parameter
    return this.httpclient.get<Api[]>(this.APIURL+'/categories/'+ categoryID + '/user/' + userID,{headers: new HttpHeaders({ //el usuario está harcodeado
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

  addFavorite(favorite:Favorite):Observable<Favorite>{
    return this.httpclient.post<Favorite>(this.APIURL+'/favorite', favorite,{headers: new HttpHeaders({
      'Content-Type': 'application/json', 'access-token':this.token}
    )}
    );
  }
  //servicio delete revisar formato body 
  deleteFavorite(favorite:Favorite){
    return this.httpclient.delete(this.APIURL+'/favorite', {"body": favorite, headers: new HttpHeaders({
      'Content-Type': 'application/json', 'access-token':this.token}
    )}
    );
  }
}
