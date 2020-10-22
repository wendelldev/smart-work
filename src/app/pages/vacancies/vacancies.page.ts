import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SwModalComponent } from 'src/app/components/sw-modal/sw-modal.component';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.page.html',
  styleUrls: ['./vacancies.page.scss'],
})
export class VacanciesPage implements OnInit {

  constructor(
    private storage: Storage,
    private modalControl: ModalController
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    await this.storage.get('user_data').then(async data => {
      if (!data.profile_updated) {
        this.openModal('Bem vindo, você gostaria de preencher seu perfil agora?', true, data.user_type)
      }
    })
  }

  async openModal(text: string, profile_update: boolean, user_type: string) {
    const modal = await this.modalControl.create({
      component: SwModalComponent,
      componentProps: {
        'text': text,
        'profile_updated': profile_update,
        'user_type': user_type
      },
      cssClass: 'sw-modal'
    })

    modal.present()
  }

}
