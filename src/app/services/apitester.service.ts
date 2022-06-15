import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Apitester {

  constructor(private _httpClient: HttpClient) {}

  sendGetRequest(url: string, headers: any){
    if (headers.length == 0){
      return this._httpClient.get<any>(url);
    }else{
      console.log(headers.length)
      headers = new HttpHeaders(headers);
      try{
        return this._httpClient.get<any>(url, { headers });
      }finally{
      }
    }
  }

  sendPostRequest(url: string, requestBody: any, headers: any) {
    console.log('flag')
    console.log(url);
    console.log(requestBody);
    console.log(headers)
    headers = new HttpHeaders(headers);
    return this._httpClient.post(url, requestBody,{ headers });
  }
}
