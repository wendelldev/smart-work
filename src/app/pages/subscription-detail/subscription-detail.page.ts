import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingService } from 'src/app/services/loading.service';
import { LocationService } from 'src/app/services/location.service';
import { ResumesService } from 'src/app/services/resumes.service';
import { ToastService } from 'src/app/services/toast.service';
import * as moment from 'moment';
import { VacanciesService } from 'src/app/services/vacancies.service';
import { SwModalComponent } from 'src/app/components/sw-modal/sw-modal.component';
import { ConfirmSubscriptionModalComponent } from 'src/app/components/confirm-subscription-modal/confirm-subscription-modal.component';

@Component({
  selector: 'app-subscription-detail',
  templateUrl: './subscription-detail.page.html',
  styleUrls: ['./subscription-detail.page.scss'],
})
export class SubscriptionDetailPage implements OnInit {

  subscriptionData = null
  userData = null
  vacancyId = null
  state = null
  city = null

  constructor(
    private loadingService: LoadingService,
    private loadingControl: LoadingController,
    private activatedRoute: ActivatedRoute,
    private resumesService: ResumesService,
    private vacanciesService: VacanciesService,
    private toastService: ToastService,
    private locationService: LocationService,
    private storage: Storage,
    private modalController: ModalController,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe(async params => {
      if (this.router.getCurrentNavigation().extras.state) {
        const subscriptionId = this.router.getCurrentNavigation().extras.state.subscriptionId
        const resumeId = this.router.getCurrentNavigation().extras.state.resumeId
        const vacancyId = this.router.getCurrentNavigation().extras.state.vacancyId
        this.vacancyId = this.router.getCurrentNavigation().extras.state.vacancyId

        this.resumesService.getResumeById(resumeId)
          .then(data => {
            this.subscriptionData = data.val()[resumeId]
            this.subscriptionData.id = subscriptionId
            this.subscriptionData.vacancyId = vacancyId
          })
          .catch(error => {
            this.toastService.presentToast(error.message, 'bottom', 'danger')
          })
      }
    })
  }

  ngOnInit() {
  }

  formatDate(dateTime: string) {
    moment.locale('pt-br')
    let time = moment(dateTime).format('DD/MM/YYYY')

    return time
  }

  async confirmModal(text: string) {
    const modal = await this.modalController.create({
      component: ConfirmSubscriptionModalComponent,
      cssClass: 'sw-modal',
      componentProps: {
        "text": text
      }
    })
    modal.onDidDismiss().then(res => {
      if (res.data) {
        this.vacanciesService.changeSubscriptionStatus(this.subscriptionData.vacancyId, this.subscriptionData.id, this.subscriptionData)
          .then(data => {
              this.router.navigate(['/tabs/vacancies'], { replaceUrl: true })
          })
          .catch(error => {
            this.toastService.presentToast(error.message, 'bottom', 'danger')
          })
      }
    })

    modal.present()
  }

  approveSubscription() {
    this.subscriptionData.status = 'approved'
    this.confirmModal(
      'Tem certeza que deseja aprovar esse candidato para sua vaga?'
    )
  }

  rejectSubscription() {
    this.subscriptionData.status = 'rejected'
    this.confirmModal(
      'Tem certeza que deseja rejeitar esse candidato?'
    )
  }

}
