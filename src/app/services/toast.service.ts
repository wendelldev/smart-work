import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async presentToast(message: string, position: any = 'bottom', color: string = 'dark') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position,
      color,
    });
    toast.present()
  }
}
