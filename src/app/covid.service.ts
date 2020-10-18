import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(public http: HttpClient) { }

  loginApi(url: string, body: any){
    return this.http.post(url, body).toPromise();
  }

  profile(url: string){

    return this.http.get(url).toPromise();

  }

  register(url: string, regis: any) {
    return this.http.post(url, regis).toPromise();


  }

}
