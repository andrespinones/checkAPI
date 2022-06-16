import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url = 'https://my-json-server.typicode.com/JSGund/XHR-Fetch-Request-JavaScript/pos';

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get(this.url, {observe: 'response'});
  }
  }
