import { LoadingService } from './../loading.service';
import { LoadingController, NavController } from '@ionic/angular';
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
  timeRegistor: any;
  getTel: any;
  img:any;
  constructor(
    public loading: LoadingService,
    public navCtrl: NavController,
    public LoadingCtr: LoadingController,
    private covidApi: CovidService,
    public storage: Storage
  ) { }

  ngOnInit() {
    this.getToken();
    this.getapi();
  }
  modify(){
    this.navCtrl.navigateForward('modifyprofile')
  }
  logout(){
    localStorage.clear();
    this.navCtrl.navigateForward('login');
  }
  getToken() {
    this.apiPfi = localStorage.getItem('token');
  }
  async getapi() {
    await this.loading.presentLoadingWithOptions();
    const getApi: any = await this.covidApi.getProfile(this.profileApi, this.apiPfi);
    this.getTel = getApi.data.tel;
    this.getName = getApi.data.displayName;
    this.getEmil = getApi.data.email;
    this.getUsername = getApi.data.username;
    this.timeRegistor = new Date(getApi.data.created);
    this.img = getApi.data.profileImageURL
    this.loading.dismissOnPageChange();
  }

}
