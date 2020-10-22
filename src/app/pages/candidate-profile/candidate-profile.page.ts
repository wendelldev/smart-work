import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingService } from 'src/app/services/loading.service';
import { LocationService } from 'src/app/services/location.service';
import { ToastService } from 'src/app/services/toast.service';
import * as moment from 'moment';
import { SwModalComponent } from 'src/app/components/sw-modal/sw-modal.component';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.page.html',
  styleUrls: ['./candidate-profile.page.scss'],
})
export class CandidateProfilePage implements OnInit {

  userData = null
  state = null
  city = null

  constructor(
    private modalControl: ModalController,
    private location: LocationService,
    private loadingController: LoadingController,
    private storage: Storage,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.storage.get('user_data').then(data => {
      this.userData = data

      this.location.getStateById(this.userData.state_id).subscribe(
        data => this.state = data[0]
      )

      this.location.getCityById(this.userData.city_id).subscribe(
        data => this.city = data[0]
      )

      if (!this.userData.profile_updated) {
        this.openModal('Bem vindo, você gostaria de preencher seu perfil profissional agora?', true, this.userData.user_type)
      }
    })
  }


  formatDate(dateTime: string) {
    moment.locale('pt-br')
    let time = moment(dateTime).format('DD/MM/YYYY')

    return time
  }

  goToUpdateCandidate() {
    this.router.navigate(['/candidate-update/avatar-profile'])
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
