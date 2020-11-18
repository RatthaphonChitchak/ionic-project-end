import { Component } from '@angular/core';


import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slider: any;
  slideOptions = {
  initialSlide: 0,
  slidesPerView: 1,
  autoplay: true
};
  constructor(public navCtrl: NavController
    ) {}

    slideChanged()
  {
     this.slider.stopAutoplay(); //this code for slide after page change
     }
    infected(){
      this.navCtrl.navigateForward('infected');
    }
    map(){
      this.navCtrl.navigateForward('map');
    }
    journey(){
      this.navCtrl.navigateForward('journey');
    }
    dashboard(){
      this.navCtrl.navigateForward('dashboard');
    }
    chet(){
      this.navCtrl.navigateForward('chet');
    }
    profile(){
      this.navCtrl.navigateForward('profile');
    }
}
