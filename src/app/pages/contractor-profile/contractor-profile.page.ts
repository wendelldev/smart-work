import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingService } from 'src/app/services/loading.service';
import { LocationService } from 'src/app/services/location.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import * as moment from 'moment'

@Component({
  selector: 'app-contractor-profile',
  templateUrl: './contractor-profile.page.html',
  styleUrls: ['./contractor-profile.page.scss'],
})
export class ContractorProfilePage implements OnInit {

  userData = null
  state = null
  city = null

  constructor(
    private alert: ToastService,
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
    await this.storage.get('user_data').then(data => {
      this.userData = data

      this.location.getStateById(this.userData.state_id).subscribe(
        data => this.state = data[0]
      )

      this.location.getCityById(this.userData.city_id).subscribe(
        data => this.city = data[0]
      )
    })
  }

  refreshProfile(event: any) {
    this.authService.getUserData(this.userData.uid, 'contractors')
      .then(data => {
        if (data.val()) {
          this.userData = data.val()
          this.storage.set('user_data', data.val())
        }
        event.target.complete()
      })
      .catch(error => {
        this.alert.presentToast(error.message, 'bottom', 'danger')
        event.target.complete()
      })
  }

  formatDate(dateTime: string) {
    moment.locale('pt-br')
    let time = moment(dateTime).format('DD/MM/YYYY')

    return time
  }

  goToUpdateContractor() {
    this.router.navigate(['/contractor-update/avatar-profile'])
  }

}
