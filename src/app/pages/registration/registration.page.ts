import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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
    private loadingControl: LoadingController
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

  register() {
    this.loadingService.presentLoadingDefault()
    const email = this.registerForm.get('email').value
    const password = this.registerForm.get('password').value
    const userType = this.registerForm.get('user_type').value
    this.authService.registerUser(email, password)
      .then(user => {
        if (this.registerForm.get('user_type').value === 'company') {
          this.authService.SetCompanyData(user, userType)
          this.loadingControl.dismiss()
          this.registerForm.reset()
          this.router.navigate(['/'])
          this.alert.presentToast('Empresa registrada, faça login!')
        } else {
          this.authService.SetCandidateData(user, userType)
          this.loadingControl.dismiss()
          this.registerForm.reset()
          this.router.navigate(['/'])
          this.alert.presentToast('Candidato(a) registrado(a), faça login!')
        }
      })
      .catch((error) => {
        this.loadingControl.dismiss()
        this.alert.presentToast(error.message, 'bottom', 'danger')
      })
    
  }

}
