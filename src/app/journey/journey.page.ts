import { CovidService } from './../covid.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.page.html',
  styleUrls: ['./journey.page.scss'],
})
export class JourneyPage implements OnInit {
  profileApi = 'http://localhost:3001/api/getuser';
  getLatlong = 'http://localhost:3000/api/userlatlong/';
  idToken: string;
  id: string;
  getLL: any;
  constructor(
    public covidApi: CovidService,
    private loadingCtr: LoadingController,
  ) { }

  ngOnInit() {
    this.getapi();
    this.getToken();
    this.getLatlongmap();
  }
  async getapi() {
    const getApi: any = await this.covidApi.getProfile(this.profileApi, this.idToken);
    this.id = getApi.data._id;
  }
  async getLatlongmap() {
    const getApi: any = await this.covidApi.getProfile(this.profileApi, this.idToken);
    this.id = getApi.data._id;
    const getatlongmap = await this.covidApi.getLatlog(this.getLatlong + this.id);
    this.getLL = getatlongmap;
    console.log(this.getLL);
  }
    getToken() {
    this.idToken = localStorage.getItem('token');
  }
}
