import { LoadingService } from './../loading.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-infected',
  templateUrl: './infected.page.html',
  styleUrls: ['./infected.page.scss'],
})
export class InfectedPage implements OnInit {

  constructor(
    private http: HttpClient,
    public loading: LoadingService
    ) { }
  resuil: any = [];
  ngOnInit() {
    this.api();
  }
  async api() {
    await this.loading.presentLoadingWithOptions();
    this.http.get('https://covid19.th-stat.com/api/open/today').subscribe(data => {
      this.resuil = data;
      this.loading.dismissOnPageChange();
    });
  }
}

