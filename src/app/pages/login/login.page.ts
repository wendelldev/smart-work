import { LoadingService } from './../../services/loading.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationController, Animation, LoadingController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit {

  animation: Animation
  loginForm: FormGroup
  iconShowPass = 'eye-outline'
  showPass = false

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
    private loadingControl: LoadingController

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

        this.authService.getUserData(res.user.uid, 'candidates').then(res => {
          if (res.val()) {
            localStorage.setItem('user_type', res.val().user_type)
          } else {
            localStorage.setItem('user_type', 'company')
          }
        })
        .catch(error => this.alert.presentToast(error.message))
        .finally(() => {
          this.loadingControl.dismiss()
          this.router.navigate(['/tabs'])
        })
      })
      .catch(error => {
        console.log(error)
        this.loadingControl.dismiss()
        this.alert.presentToast(error.message)
      })
  }

  goToRegistration() {
    this.router.navigate(['/registration'])
  }

  goToPasswordRecover() {
    this.router.navigate(['/recover-password'])
  }

}
