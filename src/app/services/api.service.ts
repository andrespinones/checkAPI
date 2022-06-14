import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpBackend} from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { Api } from '../models/apis';
import { Category } from '../models/category';
import { Endpoint } from '../models/endpoint';
import { Client } from '../models/client';
import { Favorite } from '../models/favorite';
import { User } from '../models/user.model';
import { Parameter } from '../models/parameter';
import { CategoryRel} from '../models/categoryRel';
import { ApiId } from '@azure/msal-browser';
import { RespCode } from '../models/respCode';

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

  getParamsbyEndpointID(endpointID:number){
    return this.httpclient.get<Parameter[]>(this.APIURL+'/endpoint/params/'+ endpointID,{headers: new HttpHeaders({
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

  addApi(api:Api):Observable<Api>{
    return this.httpclient.post<Api>(this.APIURL+'/api', api,{headers: new HttpHeaders({
      'Content-Type': 'application/json', 'access-token':this.token}
    )}
    );
  }
  //agregar una relacion de api con categoria
  addApiCategoryRel(categoryRel:CategoryRel):Observable<CategoryRel>{
    return this.httpclient.post<CategoryRel>(this.APIURL+'/category_api', categoryRel,{headers: new HttpHeaders({
      'Content-Type': 'application/json', 'access-token':this.token}
    )}
    );
  }

  updateApiVisibility(apiBool:any){
    return this.httpclient.put<any>(this.APIURL+'/api_visibility' , apiBool,{headers: new HttpHeaders({
      'Content-Type': 'application/json', 'access-token':this.token}
    )}
    );
  }

  deleteApi(id:any){
    return this.httpclient.delete(this.APIURL+'/delete_api/' + id, {headers: new HttpHeaders({
      'Content-Type': 'application/json', 'access-token':this.token}
    )}
    );
  }

  getGroupsByApiID(apiID:number):Observable<any>{
    return this.httpclient.get<any>(this.APIURL+'/api_groups/'+ apiID,{headers: new HttpHeaders({ 
      'Content-Type': 'application/json', 'access-token':this.token}
      )}
      );
  }

  addApiGroup(apiGroup:any){
    return this.httpclient.post<any>(this.APIURL+'/group', apiGroup,{headers: new HttpHeaders({
      'Content-Type': 'application/json', 'access-token':this.token}
    )}
    );
  }

  getEndpointsByGroupID(groupID:number){
    return this.httpclient.get<Endpoint[]>(this.APIURL+'/group/'+ groupID + '/endpoints',{headers: new HttpHeaders({ 
      'Content-Type': 'application/json', 'access-token':this.token}
      )}
      );
  }

  addEndpoint(endpoint:any){
    return this.httpclient.post<any>(this.APIURL+'/endpoint', endpoint,{headers: new HttpHeaders({
      'Content-Type': 'application/json', 'access-token':this.token}
    )}
    );
  }

  addParameter(parameter:any){
    return this.httpclient.post<any>(this.APIURL+'/parameter', parameter,{headers: new HttpHeaders({
      'Content-Type': 'application/json', 'access-token':this.token}
    )}
    );
  }

  addParameterEndpointRel(paramRel:any){
    return this.httpclient.post<any>(this.APIURL+'/paramEndpoint', paramRel,{headers: new HttpHeaders({
      'Content-Type': 'application/json', 'access-token':this.token}
    )}
    );
  }

  getRespCodesbyEndpointID(endpointID:number){
    return this.httpclient.get<RespCode[]>(this.APIURL+'/endpoint/respCodes/'+ endpointID,{headers: new HttpHeaders({ 
      'Content-Type': 'application/json', 'access-token':this.token}
      )}
      );
  }

  getAllRespCodes(){
    return this.httpclient.get<RespCode[]>(this.APIURL+'/respCodes',{headers: new HttpHeaders({ 
      'Content-Type': 'application/json', 'access-token':this.token}
      )}
      );
  }

  addEndpointRespCodes(respCodeRel:any){
    return this.httpclient.post<any>(this.APIURL+'/endpoint/respCodes', respCodeRel,{headers: new HttpHeaders({
      'Content-Type': 'application/json', 'access-token':this.token}
    )}
    );
  }



}


