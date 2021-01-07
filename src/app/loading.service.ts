import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading: any;
  constructor(
    public loadingController: LoadingController,
    public toastController: ToastController) { }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'dots',
      message: 'กำลังโหลด...',
      translucent: true,
      cssClass: 'custom-class custom-loading',

    });
    return await loading.present();
  }
  async dismissOnPageChange() {
    return await this.loadingController.dismiss();
  }
  async presentToastWithOptions(err) {
    const toast = await this.toastController.create({
      message: err,
      duration: 4000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }
  async presentToastSuccess(Success) {
    const toast = await this.toastController.create({
      message: Success,
      duration: 4000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }
}
