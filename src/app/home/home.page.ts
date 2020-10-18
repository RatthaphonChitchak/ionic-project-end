import { Component } from '@angular/core';


import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public navCtrl: NavController
    ) {}

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
