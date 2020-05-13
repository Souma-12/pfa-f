import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseServiceService {

  private uri = 'http://localhost:8081/api/entreprise/';
  headers = new HttpHeaders();
  constructor(public http: HttpClient) { }


  inscription(entreprise) {
    console.log('*** // ***', entreprise)

    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.post('http://localhost:8081/api/entreprise/save', entreprise, options);
  }
  uploadFile(file, mail, id) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    this.headers.append('Content-Type', 'multipart/form-data');
    const options = { headers: this.headers };
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);
    formData.append('mail', mail);

    return this.http.post(this.uri + 'uploadfile/', formData, options);
  }

  getAllEntreprise():Observable<any> {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri, options);
  }
  getEntrepriseByID(id) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri +id, options);
  }
  createEntreprise(entreprise){
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.post(this.uri,entreprise, options);

  }
  deleteEntreprise(id){
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.delete(this.uri +id, options);

  }
  findAllAEntreprise(){
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri, options);
}}


