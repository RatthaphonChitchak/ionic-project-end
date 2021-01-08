import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  newsOnline: any;
  img: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getnews();
  }
  getnews() {
   this.http.get<any>('http://localhost:3010/api/newss').subscribe(res => {
      this.newsOnline = res.data;
      this.img = res.data.urlimg;
    });
  }

}
