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
    this.LoadingCtr.create({
      message: 'Loading....'
    }).then((overley) => {
      this.Loading = overley;
      this.Loading.present();
      this.Loading.dismiss();
      this.navCtrl.navigateForward('register');
    });
  }
  async login() {
    try {
      const loginhome = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };
      const res: any = await this.CovidApi.loginApi(this.urllogin, loginhome);
      localStorage.setItem('token', res.token);
      this.LoadingCtr.create({
        message: 'กรุณารอสักครู่เข้าสู่ระบบ.....'
      }).then((overley) => {
        this.Loading = overley;
        this.Loading.present();
        this.Loading.dismiss();
        this.navCtrl.navigateForward('/home');
      });
    } catch (error) {
      alert('ชื่อผู้ใช้ หรือ รหัส ผิดพลาด');
    }

  }


}
