import { LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  user_type = null

  constructor(
    private loadingService: LoadingService,
    private loadingControl: LoadingController,
    private storage: Storage,
  ) {}

  async ionViewWillEnter() {
    await this.loadingService.presentLoadingDefault()
      await this.storage.get('user_type')
        .then(async type => {
          console.log(type)
          this.user_type = type
          await this.loadingControl.dismiss()
        })
  }

}
