import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatServiceService {
  
 

  private uri = 'http://localhost:8081/api/candidat/';
  headers = new HttpHeaders();
  constructor(public http: HttpClient) { }

  
  inscription(candidat) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.post(this.uri + 'save/', candidat, options);
  }
  uploadFile(file, mail, id, type) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    this.headers.append("Content-Type", "multipart/form-data");
    const options = { headers: this.headers };
    let formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);
    formData.append('mail', mail);
    formData.append('type', type);
    return this.http.post(this.uri + 'uploadfile/', formData, options);
  }

  getAllCandidat():Observable<any> {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri, options);
  }
  getCandidatByID(id) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri +id, options);
  }
  createCandidat(candidat){
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.post(this.uri,candidat, options);

  }
  deleteCandidat(id){
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.delete(this.uri +id, options);

  }
  getByLogin(login) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri + 'findByLogin/' + login, options);
  }
  findAllACandidat(){
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri, options);
}}

