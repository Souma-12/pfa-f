import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private uri = 'http://localhost:8081/authentification/';
  headers = new HttpHeaders();
  constructor(public http: HttpClient) { }

  authentication(loginRquest) {
    const options = { headers: this.headers };
    return this.http.post(this.uri + 'login/' ,loginRquest, options);
  }
  
}
