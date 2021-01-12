import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


import { NavController } from '@ionic/angular';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  [x: string]: any;
  slider: any;
  slideOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
  newsOnline: any;
  img: any;
  constructor(
    public navCtrl: NavController,
    private http: HttpClient,
    public loading: LoadingService

  ) { }
  ngOnInit() {
    this.getnews();
  }
  getnews() {
    this.http.get<any>('https://covid19news-00.herokuapp.com/api/newss').subscribe(res => {
      this.newsOnline = res.data;
      this.img = res.data.urlimg;
      this.i = res.data.length;
    });
  }
  slideChanged() {
    this.slider.stopAutoplay(); 
  }
  infected() {
    this.navCtrl.navigateForward('infected');
  }
  map() {
    this.navCtrl.navigateForward('map');
  }
  journey() {
    this.navCtrl.navigateForward('journey');
  }
  dashboard() {
    this.navCtrl.navigateForward('dashboard');
  }
  chet() {
    this.navCtrl.navigateForward('chet');
  }
  profile() {
    this.navCtrl.navigateForward('profile');
  }
}
