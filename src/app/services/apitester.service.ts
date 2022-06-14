import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Apitester {

  constructor(private _httpClient: HttpClient) {}

  sendGetRequest(url: string, headers: any):Observable<any>{
    headers = new HttpHeaders(headers);
    return this._httpClient.get<any>(url, { headers });

  }

  sendPostRequest(url: string, requestBody: any, headers: any) {
    headers = new HttpHeaders(headers);
    return this._httpClient.post(url, requestBody, { headers });
  }
}
