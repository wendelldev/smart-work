import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, Animation } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit {

  animation: Animation
  @ViewChild('lightblue', {static: false}) light_blue: ElementRef
  @ViewChild('strongblue', {static: false}) strong_blue: ElementRef
  @ViewChild('wrapper', {static: false}) wrapper: ElementRef
  @ViewChild('logo', {static: false}) logo: ElementRef


  constructor(
    private router: Router,
    private animationControl: AnimationController
  ) { }

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

  goToNextPage() {
    this.router.navigate(['/tabs'])
  }

}
