import { LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  user_type = null

  constructor(
    private storage: Storage,
    private router: Router
  ) {}

  async ionViewWillEnter() {
    await this.storage.get('user_data')
      .then(async data => {
        this.user_type = data.user_type
        if (this.user_type == 'contractor') {
          this.router.navigate(['/tabs/resumes'])
        } else {
          this.router.navigate(['/tabs/vacancies'])
        }
      })
  }

}
