import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SwModalComponent } from 'src/app/components/sw-modal/sw-modal.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.page.html',
  styleUrls: ['./vacancies.page.scss'],
})
export class VacanciesPage implements OnInit {

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
    await this.loadingService.presentLoadingDefault()
    await this.storage.get('user_type')
      .then(async type => {
        if (type === 'candidate') {
          await this.storage.get('user')
          .then(async user => {
            const userData = JSON.parse(user)
            this.authService.getUserData(userData.uid, type + 's')
              .then(async (res: any) => {
                await this.loadingControl.dismiss()
                if (!res.val().profile_updated) {
                  this.openModal('Bem vindo, você gostaria de preencher seu perfil agora?', true, type)
                }
              })
              .catch(async error => {
                await this.loadingControl.dismiss()
                this.alert.presentToast(error.message, 'bottom', 'danger')
              })
          })
          .catch(async error => {
            await this.loadingControl.dismiss()
            this.alert.presentToast(error.message, 'bottom', 'danger')
          })
        } else {
          await this.loadingControl.dismiss()
        }
      })
      .catch(async error => {
        await this.loadingControl.dismiss()
        this.alert.presentToast(error.message, 'bottom', 'danger')
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
