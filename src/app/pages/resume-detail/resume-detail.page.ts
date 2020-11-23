import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingService } from 'src/app/services/loading.service';
import { LocationService } from 'src/app/services/location.service';
import { ResumesService } from 'src/app/services/resumes.service';
import { ToastService } from 'src/app/services/toast.service';
import * as moment from 'moment'

@Component({
  selector: 'app-resume-detail',
  templateUrl: './resume-detail.page.html',
  styleUrls: ['./resume-detail.page.scss'],
})
export class ResumeDetailPage implements OnInit {

  resumeData = null
  userData = null
  state = null
  city = null

  constructor(
    private loadingService: LoadingService,
    private loadingControl: LoadingController,
    private activatedRoute: ActivatedRoute,
    private resumesService: ResumesService,
    private toastService: ToastService,
    private locationService: LocationService,
    private storage: Storage,
    private modalController: ModalController,
    private router: Router
  ) { }

  async ngOnInit() {
    const resumeId = this.activatedRoute.snapshot.params.resumeId
    await this.loadingService.presentLoadingDefault()
    this.resumesService.getResumeById(resumeId)
      .then(async data => {
        this.userData = await this.storage.get('user_data')
        this.resumeData = data.val()[resumeId]

        this.locationService.getStateById(this.resumeData.state_id).subscribe(
          data => {
            this.state = data[0]

            this.locationService.getCityById(this.resumeData.city_id).subscribe(
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

  formatDate(dateTime: string) {
    moment.locale('pt-br')
    let time = moment(dateTime).format('DD/MM/YYYY')

    return time
  }

}
