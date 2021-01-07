import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-infected',
  templateUrl: './infected.page.html',
  styleUrls: ['./infected.page.scss'],
})
export class InfectedPage implements OnInit {

  constructor(private http: HttpClient) { }

  
  resuil: any = [];
  ngOnInit() {
    this.api();
  }
  api() {
    this.http.get('https://covid19.th-stat.com/api/open/today').subscribe(data => {
      this.resuil = data;
    });
  }
}

