import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class CovidService {
  constructor(
    private http: HttpClient
  ) { }

  getProfile(url: string, token: any) {
    return this.http.get(url, { headers: this.addStandardHeaders(token) }).toPromise();
  }
  addStandardHeaders(token: any) {
    let header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    // header = header.append('Accept', 'application/json');
    header = header.append('Authorization', `Bearer ${token}` );
    return header;
  }

  loginApi(url: string, body: any) {
    return this.http.post(url, body).toPromise();
  }
  register(url: string, regis: any) {
    return this.http.post(url, regis).toPromise();
  }
  postLatlog(url: string, post: any, token: any){
    return this.http.post(url, post, { headers: this.addStandardHeaders(token) }).toPromise();
  }
  getLatlog(url: string){
    return this.http.get(url).toPromise();
  }
}
