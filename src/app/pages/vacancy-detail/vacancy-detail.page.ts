import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SwModalComponent } from 'src/app/components/sw-modal/sw-modal.component';
import { LoadingService } from 'src/app/services/loading.service';
import { LocationService } from 'src/app/services/location.service';
import { ToastService } from 'src/app/services/toast.service';
import { VacanciesService } from 'src/app/services/vacancies.service';

@Component({
  selector: 'app-vacancy-detail',
  templateUrl: './vacancy-detail.page.html',
  styleUrls: ['./vacancy-detail.page.scss'],
})
export class VacancyDetailPage implements OnInit {

  vacancyData = null
  userData = null
  subscribed: boolean = false
  state = null
  city = null

  subscriptions = null
  subscriptionsKeys = null

  constructor(
    private loadingService: LoadingService,
    private loadingControl: LoadingController,
    private activatedRoute: ActivatedRoute,
    private vacanciesService: VacanciesService,
    private toastService: ToastService,
    private locationService: LocationService,
    private storage: Storage,
    private modalController: ModalController,
    private router: Router
  ) { }

  async ngOnInit() {
    const vacancyId = this.activatedRoute.snapshot.params.vacancyId
    await this.loadingService.presentLoadingDefault()
    this.vacanciesService.getVacancyById(vacancyId)
      .then(async data => {
        this.userData = await this.storage.get('user_data')
        this.vacancyData = data.val()[vacancyId]
        this.subscriptions = this.vacancyData.subscriptions

        if (this.subscriptions) {
          this.subscriptionsKeys = Object.keys(this.subscriptions)
          this.subscriptionsKeys.forEach((item: any) => {
            if (this.subscriptions[item].uid === this.userData.uid) {
              this.subscribed = true
            }
          })
        }

        this.locationService.getStateById(this.vacancyData.state_id).subscribe(
          data => {
            this.state = data[0]

            this.locationService.getCityById(this.vacancyData.city_id).subscribe(
              data => this.city = data[0]
            )
          }
        )

        await this.loadingControl.dismiss()
      })
      .catch(async error => {
        this.toastService.presentToast(error.message, 'bottom', 'danger')
        await this.loadingControl.dismiss()
      })
  }

  goToSubscriptions() {
    this.router.navigate(['/subscriptions'], { state: { subscriptions: this.subscriptions } })
  }

  async showModal(text: string) {
    const modal = await this.modalController.create({
      component: SwModalComponent,
      cssClass: 'sw-modal',
      componentProps: {
        "text": text
      }
    })
    modal.onDidDismiss().then(() => {
      this.router.navigate(['/tabs/vacancies'])
    })

    modal.present()
  }

  async subscribeToVacancy() {
    await this.loadingService.presentLoadingDefault()

    if (this.subscribed) {
      this.showModal(
        'Você já se inscreveu para esta vaga. por favor, aguarde o contato do contratante.'
      )
      await this.loadingControl.dismiss()
    } else if (this.userData.user_type === 'contractor' && this.vacancyData.contract_type !== 'Pessoa Jurídica') {
      this.showModal(
        'Você não pode se inscrever para esta vaga. Use um perfil de candidato para isso.'
      )
      await this.loadingControl.dismiss()
    } else {

      if (this.userData.profile_updated) {
        const candidateObj = {
          "uid": this.userData.uid,
          "avatar_url": this.userData.avatar_url,
          "name": this.userData.name,
          "email": this.userData.email,
          "state_name": this.state.name,
          "city_name": this.city.name
        }
    
        this.vacanciesService.subscribeToVacancy(this.vacancyData.id, candidateObj)
          .then(async res => {
            this.showModal(
              `Você se candidatou à vaga ${this.vacancyData.objective}, aguarde o contato do contratante e boa sorte!`
            )
            await this.loadingControl.dismiss()
          })
          .catch(async err => {
            console.log(err)
            await this.loadingControl.dismiss()
          })
      } else {
        this.showModal(
          'Você precisa atualizar seu perfil para poder se candidatar a uma vaga.'
        )
        await this.loadingControl.dismiss()
      }
    }
  }

}
