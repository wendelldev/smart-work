import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { SwModalComponent } from 'src/app/components/sw-modal/sw-modal.component';

@Component({
  selector: 'app-resumes',
  templateUrl: './resumes.page.html',
  styleUrls: ['./resumes.page.scss'],
})
export class ResumesPage implements OnInit {

  constructor(
    private storage: Storage,
    private loadingControl: LoadingController,
    private loadingService: LoadingService,
    private authService: AuthenticationService,
    private alert: ToastService,
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
