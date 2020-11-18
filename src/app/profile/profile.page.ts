import { LoadingController } from '@ionic/angular';
import { CovidService } from './../covid.service';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileApi = 'https://ratthaphoncovid19.herokuapp.com/api/getuser';
  apiPfi: any;
  getName: any;
  getEmil: any;
  getUsername: any;
  constructor(
    public LoadingCtr: LoadingController,
    private covidApi: CovidService,
    public storage: Storage
  ) { }

  ngOnInit() {
    this.getToken();
    this.getapi();

  }
  getToken() {
    this.apiPfi = localStorage.getItem('token');
  }
  async getapi() {
    const getApi: any = await this.covidApi.getProfile(this.profileApi, this.apiPfi);
    this.getName = getApi.data.displayName;
  }

}
