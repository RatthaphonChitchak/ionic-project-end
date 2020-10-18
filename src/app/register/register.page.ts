import { NavController, LoadingController } from '@ionic/angular';
import { CovidService } from './../covid.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  urlRegis = 'https://ratthaphoncovid19.herokuapp.com/api/auth/signup';
  private Loading;
  regisform: FormGroup;
  constructor(
    private loadingCtr: LoadingController,
    private covidApi: CovidService,
    public navCtrl: NavController
    ) {
      this.regisform = new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.pattern('')]),
        lastName: new FormControl('', [Validators.required, Validators.pattern('')]),
        email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z.a-z]')]),
        username: new FormControl('', [Validators.required, Validators.pattern('')]),
        password: new FormControl('', [Validators.required, Validators.pattern('')])

      });

  }

  ngOnInit() {
  }
  ngSubmit(){

    this.register();

  }

  async register(){

    try {

      const regishome = {

        firstName: this.regisform.value.firstName,
        lastName: this.regisform.value.lastName,
        username: this.regisform.value.username,
        password: this.regisform.value.password,
        email: this.regisform.value.email
      };
      const regis = await this.covidApi.register(this.urlRegis, regishome);
      this.loadingCtr.create({
        message: 'กรุณารอสักครู่กำลังบันทึก....'
      }).then((overley) => {
        this.Loading = overley;
        this.Loading.present();
      }),
      setTimeout(() => {
        this.Loading.dismiss(),
        this.navCtrl.navigateForward('login');
      }, 4000);

    } catch (error) {

    }

  }
}
