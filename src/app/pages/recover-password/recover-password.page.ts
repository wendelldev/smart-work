import { LoadingController } from '@ionic/angular';
import { LoadingService } from './../../services/loading.service';
import { AuthenticationService } from './../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {

  resetEmailForm: FormGroup

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private alert: ToastService,
    private loadingService: LoadingService,
    private loadingControl: LoadingController
  ) { }

  ngOnInit() {
    this.resetEmailForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]]
    })
  }

  sendEmail() {
    this.loadingService.presentLoadingDefault()
    const email = this.resetEmailForm.get('email').value

    this.authService.PasswordRecover(email)
      .then(() => {
        this.loadingControl.dismiss()
        this.router.navigate(['/'], { replaceUrl: true })
        this.alert.presentToast('Um email foi enviado para redefinir sua senha')
      })
      .catch(error => {
        this.loadingControl.dismiss()
        if (error.code === 'auth/user-not-found') {
          this.alert.presentToast('Email não encontrado na base de dados. Verifique se o email está correto.', 'bottom', 'danger')
        } else {
          this.alert.presentToast(error.message, 'bottom', 'danger')
        }
      })
  }

}
