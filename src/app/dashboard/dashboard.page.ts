import { LoadingService } from './../loading.service';
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
  constructor(
    private http: HttpClient,
    public loading: LoadingService
    ) { }

  ngOnInit() {
    this.getnews();
  }
  async getnews() {
    await this.loading.presentLoadingWithOptions();
   this.http.get<any>('https://covid19news-00.herokuapp.com/api/newss').subscribe(res => {
      this.newsOnline = res.data;
      this.img = res.data.urlimg;
      this.loading.dismissOnPageChange();
    });
  }

}
