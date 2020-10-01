import { LoadingService } from './../../services/loading.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationController, Animation, LoadingController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit {

  animation: Animation
  loginForm: FormGroup
  showPass: boolean = false

  @ViewChild('lightblue', {static: false}) light_blue: ElementRef
  @ViewChild('strongblue', {static: false}) strong_blue: ElementRef
  @ViewChild('wrapper', {static: false}) wrapper: ElementRef
  @ViewChild('logo', {static: false}) logo: ElementRef


  constructor(
    private router: Router,
    private animationControl: AnimationController,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private alert: ToastService,
    private loadingService: LoadingService,
    private loadingControl: LoadingController,
    private storage: Storage

  ) {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  ionViewWillEnter() {
    this.loginForm.reset()
  }

  ngAfterViewInit() {

    const wrapperAnimation = this.animationControl.create()
      .addElement(this.wrapper.nativeElement)
      .duration(1000)
      .keyframes([
        { offset: 0, transform: 'translateY(-100px)', opacity: '0' },
        { offset: 0.5, transform: 'translateY(-50px)', opacity: '0' },
        { offset: 1, transform: 'translateY(0px)', opacity: '1' }
      ])
    
    const logoAnimation = this.animationControl.create()
      .addElement(this.logo.nativeElement)
      .duration(1000)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '0' },
        { offset: 0.9, transform: 'scale(1.2) rotate(20deg)', opacity: '1' },
        { offset: 1, transform: 'scale(1) rotate(0)', opacity: '1' }
      ])


    const lightBlueAnimation = this.animationControl.create()
      .addElement(this.light_blue.nativeElement)
      .duration(2000)
      .keyframes([
        { offset: 0, transform: 'translateX(-100px)', opacity: '0' },
        { offset: 0.5, transform: 'translateX(-50px)', opacity: '.2'},
        { offset: 1, transform: 'translateX(0px)', opacity: '1'},
      ])
    
    const strongBlueAnimation = this.animationControl.create()
      .addElement(this.strong_blue.nativeElement)
      .keyframes([
        { offset: 0, transform: 'translateX(-100px)', opacity: '0' },
        { offset: 0.5, transform: 'translateX(-50px)', opacity: '.2'},
        { offset: 1, transform: 'translateX(0px)', opacity: '1'},
      ])
    
    const animateGroup = this.animationControl.create()
      .duration(1500)
      .addAnimation([lightBlueAnimation, strongBlueAnimation, wrapperAnimation, logoAnimation])

    animateGroup.play()

  }

  toggleShowPassword() {
     this.showPass = !this.showPass
  }

  doLogin() {
    this.loadingService.presentLoadingDefault()

    const email = this.loginForm.get('email').value
    const password = this.loginForm.get('password').value
    
    this.authService.SignIn(email, password)
      .then(res => {
        this.storage.set('user', JSON.stringify(res.user))
        if (res.user.emailVerified) {
          this.authService.getUserData(res.user.uid, 'candidates').then(res => {
            if (res.val()) {
              this.storage.set('user_type', res.val().user_type)
              this.storage.set('user_data', JSON.stringify(res.val()))
              this.loadingControl.dismiss()
              this.router.navigate(['/tabs/tab1'])
            }
          })
          .catch(error => {
            this.loadingControl.dismiss()
          })

          this.authService.getUserData(res.user.uid, 'contractors').then(res => {
            if (res.val()) {
              this.storage.set('user_type', res.val().user_type)
              this.storage.set('user_data', JSON.stringify(res.val()))
              this.loadingControl.dismiss()
              this.router.navigate(['/tabs/tab1'])
            }
          })
          .catch(error => {
            this.loadingControl.dismiss()
          })
          
        } else {
          this.loadingControl.dismiss()
          this.router.navigate(['/email-verification'])
          this.alert.presentToast('Verifique seu email.')
        }
      })
      .catch(error => {
        this.loadingControl.dismiss()
        if (error.code === "auth/user-not-found") {
          this.alert.presentToast('Email não cadastrado.', 'bottom', 'danger')
        } else  if (error.code === "auth/wrong-password") {
          this.alert.presentToast('Senha incorreta para o email informado.', 'bottom', 'danger')
        } else {
          this.alert.presentToast('Algo deu errado, verifique sua conexão com a internet.', 'bottom', 'danger')
        }
      })
  }
}
