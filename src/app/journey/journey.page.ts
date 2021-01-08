import { LoadingService } from './../loading.service';
import { CovidService } from './../covid.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.page.html',
  styleUrls: ['./journey.page.scss'],
})
export class JourneyPage implements OnInit {
  urllatlng = 'https://latlongpnru.herokuapp.com/api/latlongs';
  profileApi = 'https://ratthaphoncovid19.herokuapp.com/api/getuser';
  getLatlong = 'https://latlongpnru.herokuapp.com/api/userlatlong/';
  idToken: string;
  id: string;
  getlatlng: any;
  constructor(
    public loading: LoadingService,
    public covidApi: CovidService,
    private loadingCtr: LoadingController,
  ) { }

  ngOnInit() {
    this.getapi();
    this.getToken();
    this.getLatlongmap();
  }
  async getapi() {
      await this.loading.presentLoadingWithOptions();
      const getApi: any = await this.covidApi.getProfile(this.profileApi, this.idToken);
      this.id = getApi.data._id;
      this.loading.dismissOnPageChange();
  }
  async getLatlongmap() {
    const getApi: any = await this.covidApi.getProfile(this.profileApi, this.idToken);
    this.id = getApi.data._id;
    const getatlongmap: any = await this.covidApi.getLatlog(this.getLatlong + this.id);
    this.getlatlng =  getatlongmap.data;
  }
    getToken() {
    this.idToken = localStorage.getItem('token');
  }
  openmap(){
    
  }
}
