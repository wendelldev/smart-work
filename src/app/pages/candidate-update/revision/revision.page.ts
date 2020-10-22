import { LocationService } from './../../../services/location.service';
import { AuthenticationService } from './../../../services/authentication.service';
import { LoadingService } from './../../../services/loading.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import * as moment from 'moment'

@Component({
  selector: 'app-revision',
  templateUrl: './revision.page.html',
  styleUrls: ['../candidate-update.page.scss'],
})
export class RevisionPage implements OnInit {

  user: any
  userData: any
  state: any
  city: any

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localStorage: Storage,
    private loadingService: LoadingService,
    private loadingControl: LoadingController,
    private authService: AuthenticationService,
    private location: LocationService,
    private alert: ToastService
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userData = this.router.getCurrentNavigation().extras.state.user_data

        this.location.getStateById(this.userData.state_id).subscribe(
          data => this.state = data[0],
          error => this.alert.presentToast(error.message, 'bottom', 'danger')
        )
        
        this.location.getCityById(this.userData.city_id).subscribe(
          data => this.city = data[0],
          error => this.alert.presentToast(error.message, 'bottom', 'danger')
        )  
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

  removeExperience(id: any) {
    this.userData.experiences.splice(id, 1)
    this.localStorage.set('experiences', JSON.stringify(this.userData.experiences))
  }

  goToInit() {
    this.router.navigate(['/candidate-update/personal-info'])
  }

  saveData() {
    this.loadingService.presentLoadingDefault()
    this.userData.profile_updated = true
    this.authService.updateUserData(this.userData.uid, this.userData.user_type, this.userData)
      .then(res => {
        this.loadingControl.dismiss()
        this.router.navigate(['/tabs/candidate-profile'], {  })
        this.localStorage.set('user_data', this.userData)
        this.alert.presentToast('Usuário atualizado com sucesso.')
      })
      .catch(error => {
        this.loadingControl.dismiss()
        this.alert.presentToast(error, 'bottom', 'danger')
      })
  }

}
