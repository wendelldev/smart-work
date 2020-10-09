import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private localStorage: Storage,
    private loadingService: LoadingService,
    private loadingControl: LoadingController,
    private authService: AuthenticationService,
    private location: LocationService,
    private alert: ToastService
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.user = JSON.parse(await this.localStorage.get('user'))
    this.userData = JSON.parse(await this.localStorage.get('user_data'))

    this.location.getStateById(this.userData.state_id).subscribe(
      data => this.state = data[0],
      error => this.alert.presentToast(error.message, 'bottom', 'danger')
    )
    
    this.location.getCityById(this.userData.city_id).subscribe(
      data => this.city = data[0],
      error => this.alert.presentToast(error.message, 'bottom', 'danger')
    )
  }

  goToInit() {
    this.router.navigate(['/contractor-update/contact'])
  }

  async saveData() {
    await this.loadingService.presentLoadingDefault()
    this.userData.profile_updated = true
    this.authService.updateUserData(this.user.uid, this.userData.user_type, this.userData)
      .then(async res => {
        await this.loadingControl.dismiss()
        this.router.navigate(['/tabs/contractor-profile'])
        this.alert.presentToast('Usuário atualizado com sucesso.')
      })
      .catch(async error => {
        await this.loadingControl.dismiss()
        this.alert.presentToast(error.message, 'bottom', 'danger')
      })
  }

}
