import { Router } from '@angular/router';
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

  userData = null
  state = null
  city = null

  constructor(
    private alert: ToastService,
    private modalControl: ModalController,
    private location: LocationService,
    private authService: AuthenticationService,
    private loadingService: LoadingService,
    private loadingControl: LoadingController,
    private storage: Storage,
    private router: Router
  ) {}

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.loadingService.presentLoadingDefault()
    await this.storage.get('user')
      .then(async user => {
        const userData = JSON.parse(user)
        await this.storage.get('user_type')
          .then(type => {
            this.authService.getUserData(userData.uid, type + 's')
              .then(res => {
                this.userData = res.val()

                this.location.getStateById(this.userData.state_id).subscribe(
                  data => this.state = data[0]
                )
          
                this.location.getCityById(this.userData.city_id).subscribe(
                  data => this.city = data[0]
                )

                if (!this.userData.profile_updated) {
                  this.openModal('Bem vindo, você gostaria de preencher seu perfil profissional agora?', true, this.userData.user_type)
                }

                this.loadingControl.dismiss()
              })
              .catch(error => {
                this.loadingControl.dismiss()
                this.alert.presentToast(error.message, 'bottom', 'danger')
              })
          })
      })
  }

  goToUpdateCandidate() {
    this.router.navigate(['/candidate-update/avatar-profile'], { queryParams: { update: 'true' } })
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
