import { SwModalComponent } from './../../components/sw-modal/sw-modal.component';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { LoadingService } from './../../services/loading.service';
import { AuthenticationService } from './../../services/authentication.service';
import { ValidatorsService } from './../../services/validators.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  registerForm: FormGroup
  showPass = false
  showPassConfirmation = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private validatorService: ValidatorsService,
    private authService: AuthenticationService,
    private alert: ToastService,
    private loadingService: LoadingService,
    private loadingControl: LoadingController,
    private modalControl: ModalController
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      email_confirmation: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8), Validators.required]],
      password_confirmation: ['', [Validators.minLength(8), Validators.required]],
      user_type: ['', Validators.required]
    }, {
      validators: [this.validatorService.matchValidator('email', 'email_confirmation'), this.validatorService.matchValidator('password', 'password_confirmation')]
    })
  }

  toggleShowPassword() {
    this.showPass = !this.showPass
  }

  toggleShowPasswordConfirmation() {
    this.showPassConfirmation = !this.showPassConfirmation
  }

  async openModal(text: string) {
    const modal = await this.modalControl.create({
      component: SwModalComponent,
      cssClass: "sw-modal",
      componentProps: {
        "text": text
      }
    })
    modal.onDidDismiss().then(() => {
      this.router.navigate(['/email-verification'])
    })

    modal.present()
  }

  register() {
    this.loadingService.presentLoadingDefault()
    const email = this.registerForm.get('email').value
    const password = this.registerForm.get('password').value
    const userType = this.registerForm.get('user_type').value
    this.authService.registerUser(email, password)
      .then(res => {
        this.authService.SetUserData(res, userType)
        this.registerForm.reset()
        res.user.sendEmailVerification()
        this.loadingControl.dismiss()
        this.openModal("Cadastro realizado com sucesso. Confirme seu email.")
      })
      .catch((error) => {
        this.loadingControl.dismiss()
        this.alert.presentToast(error.message, 'bottom', 'danger')
      })
    
  }

}
