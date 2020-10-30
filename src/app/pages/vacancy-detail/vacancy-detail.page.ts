import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
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
  state = null
  city = null

  constructor(
    private loadingService: LoadingService,
    private loadingControl: LoadingController,
    private activatedRoute: ActivatedRoute,
    private vacanciesService: VacanciesService,
    private toastService: ToastService,
    private locationService: LocationService,
    private storage: Storage
  ) { }

  async ngOnInit() {
    const vacancyId = this.activatedRoute.snapshot.params.vacancyId
    await this.loadingService.presentLoadingDefault()
    this.vacanciesService.getVacancyById(vacancyId)
      .then(async data => {
        this.vacancyData = data.val()[vacancyId]

        this.locationService.getStateById(this.vacancyData.state_id).subscribe(
          data => {
            this.state = data[0]

            this.locationService.getCityById(this.vacancyData.city_id).subscribe(
              data => this.city = data[0]
            )
          }
        )

        this.userData = await this.storage.get('user_data')

        await this.loadingControl.dismiss()
      })
      .catch(async error => {
        this.toastService.presentToast(error.message, 'bottom', 'danger')
        await this.loadingControl.dismiss()
      })
  }

  sendResume() {

  }

}
