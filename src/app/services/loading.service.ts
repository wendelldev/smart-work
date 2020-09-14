import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loadingController: LoadingController) { }

  async presentLoadingDefault(message: string = 'Por favor, aguarde...') {
    const loading = await this.loadingController.create({
      message: message
    })
  
    loading.present();
  }
}
