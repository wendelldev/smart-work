import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.page.html',
  styleUrls: ['./email-verification.page.scss'],
})
export class EmailVerificationPage implements OnInit {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private alert: ToastService

  ) { }

  ngOnInit() {
  }

  resendEmailVerification() {
    this.angularFireAuth.authState.subscribe(user => {
      user.sendEmailVerification()
      this.alert.presentToast('Email reenviado, verifique sua caixa de entrada e span.')
    },
    (error) => {
      this.alert.presentToast(error.message, 'bottom', 'danger')
    })
  }

}
