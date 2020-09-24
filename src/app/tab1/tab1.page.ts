import { AuthenticationService } from './../services/authentication.service';
import { LocationService } from './../services/location.service';
import { SwModalComponent } from './../components/sw-modal/sw-modal.component';
import { Component } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';
import { LoadingService } from '../services/loading.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  user = null
  state = null
  city = null

  constructor(
    private alert: ToastService,
    private modalControl: ModalController,
    private location: LocationService,
    private authService: AuthenticationService,
    private loadingService: LoadingService,
    private loadingControl: LoadingController,
    private storage: Storage
  ) {}

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.loadingService.presentLoadingDefault()
    await this.storage.get('user_data')
      .then(data => {
        const userData = JSON.parse(data)
        this.authService.getUserData(userData.uid, userData.user_type + 's')
          .then(res => {
              this.user = res.val()

              this.location.getStateById(this.user.state_id).subscribe(
                data => this.state = data[0]
              )
          
              this.location.getCityById(this.user.city_id).subscribe(
                data => this.city = data[0]
              )

              if (!this.user.profile_updated) {
                this.openModal('Bem vindo, você gostaria de preencher seu perfil profissional agora?', true, this.user.user_type)
              }

              this.loadingControl.dismiss()
          })
      })
  }

  async openModal(text: string, profile_updated: boolean, user_type: string) {
    const modal = await this.modalControl.create({
      component: SwModalComponent,
      cssClass: "sw-modal",
      componentProps: {
        "text": text,
        "profile_updated": profile_updated,
        "user_type": user_type
      }
    })

    modal.present()
  }

}
