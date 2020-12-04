import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingService } from 'src/app/services/loading.service';
import { LocationService } from 'src/app/services/location.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-revision',
  templateUrl: './revision.page.html',
  styleUrls: ['../contractor-update.page.scss'],
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

  goToInit() {
    this.router.navigate(['/contractor-update/contact'])
  }

  async saveData() {
    await this.loadingService.presentLoadingDefault()
    this.userData.profile_updated = true
    this.authService.updateUserData(this.userData.uid, this.userData.user_type, this.userData)
      .then(async res => {
        this.localStorage.set('user_data', this.userData)
        await this.loadingControl.dismiss()
        this.router.navigate(['/tabs/contractor-profile'])
        this.alert.presentToast('Contratante atualizado com sucesso.')
      })
      .catch(async error => {
        await this.loadingControl.dismiss()
        this.alert.presentToast(error.message, 'bottom', 'danger')
      })
  }

}
