import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toastService: ToastService
  ) {}

  logout() {
    this.authService.logout()
      .then(res => {
        this.authService.removeUserDataFromStorage()
        this.router.navigate(['/login'], { replaceUrl: true })
      })
      .catch(error => {
        this.toastService.presentToast(error.message, 'bottom',' danger')
      })
  }

}
