import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  userData = null
  notifications = null
  notificationsKeys = null
  isLoading = false

  constructor(
    private notificationsService: NotificationsService,
    private storage: Storage,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.isLoading = true
    this.storage.get('user_data').then(data => {
      this.userData = data
      this.refreshNotifications()
      this.isLoading = false
    })
  }

  refreshNotifications() {
    this.notificationsService.getNotifications(this.userData.uid)
      .then(data => {
        if (data.val()) {
          this.notifications = data.val()
          this.notificationsKeys = Object.keys(this.notifications)
        }
      })
      .catch(error => {
        this.toastService.presentToast(error.message, 'bottom', 'danger')
      })
  }

  onPageNotificationsRefresh(event: any) {
    
  }

}
