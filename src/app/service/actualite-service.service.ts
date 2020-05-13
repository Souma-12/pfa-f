import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class ActualiteServiceService {

  private uri = 'http://localhost:8081/api/actualite';
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.cookies.get('acessToken')
  });
  constructor(public http: HttpClient, private cookies: CookieService) { }

  getAllActualite():Observable<any> {
    const options = { headers: this.headers };
    return this.http.get(this.uri, options);
  }
  getActualiteByID(id) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri +id, options);
  }
  createActualite(actualite){
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.post(this.uri,actualite, options);

  }
  deleteActualite(id){
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.delete(this.uri +id, options);

  }
  
}
