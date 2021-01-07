import { LoadingService } from './../loading.service';
import { Storage } from '@ionic/storage';
import { CovidService } from './../covid.service';
import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { NavController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  [x: string]: any;
  Loading: any;
  mass: any = '';
  urllogin = 'https://ratthaphoncovid19.herokuapp.com/api/auth/signin';
  loginForm: FormGroup;

  constructor(
    public loading: LoadingService,
    public storage: Storage,
    private LoadingCtr: LoadingController,
    private CovidApi: CovidService,
    public navCtrl: NavController
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }
  ngOnInit() {
  }
  onSubmit() {
    this.login();
  }
  register() {
    this.navCtrl.navigateForward('register');
  }
  async login() {
    await this.loading.presentLoadingWithOptions();
    try {
      const loginhome = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };
      const res: any = await this.CovidApi.loginApi(this.urllogin, loginhome);
      localStorage.setItem('token', res.token);
      this.navCtrl.navigateForward('/home');
      this.loading.dismissOnPageChange();
    } catch (error) {
      this.loading.dismissOnPageChange();
      alert('ชื่อผู้ใช้ หรือ รหัส ผิดพลาด');
    }
  }


}
