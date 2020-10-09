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
    await this.loadingService.presentLoadingDefault()
    await this.storage.get('user_type')
      .then(async type => {
        if (type === 'contractor') {
          await this.storage.get('user')
          .then(async user => {
            const userData = JSON.parse(user)
            this.authService.getUserData(userData.uid, type + 's')
              .then(async (res: any) => {
                await this.loadingControl.dismiss()
                if (!res.val().profile_updated) {
                  this.openModal('Bem vindo, você precisa preencher seu perfil para continuar usando o SmartWork', false, type)
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
