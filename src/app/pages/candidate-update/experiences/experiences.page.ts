import { ExperienceModalPage } from './../../experience-modal/experience-modal.page';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.page.html',
  styleUrls: ['../candidate-update.page.scss'],
})
export class ExperiencesPage implements OnInit {

  candidateForm: FormGroup
  userData: any


  constructor(
    private formBuilder: FormBuilder,
    private localStorage: Storage,
    private router: Router,
    private modalControl: ModalController
  ) { }

  ngOnInit() {
    this.candidateForm = this.formBuilder.group({
      experiences: [[]]
    })
  }
  
  async ionViewWillEnter() {
    await this.localStorage.get('user_data')
      .then(data => {
        this.userData = JSON.parse(data)
        this.candidateForm.patchValue(this.userData)
      })
  }

  removeExperience(id: any) {
    let newExperiences = this.candidateForm.get('experiences').value
    newExperiences.splice(id, 1)
    this.candidateForm.get('experiences').setValue(newExperiences)
  }

  async experienceModal() {
    const modal = await this.modalControl.create({
      component: ExperienceModalPage,
      cssClass: 'experience-modal'
    })

    modal.onDidDismiss().then(async () => {
      const experiences = JSON.parse(await this.localStorage.get('experiences'))
      if (experiences) {
        this.candidateForm.get('experiences').setValue(experiences)
      }
    })

    modal.present()
  }

  nextPage() {
    this.userData.experiences = this.candidateForm.get('experiences').value

    this.localStorage.set('user_data', JSON.stringify(this.userData))
    this.router.navigate(['/candidate-update/presentation'])
  }

}
