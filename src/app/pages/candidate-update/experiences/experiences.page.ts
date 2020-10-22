import { ExperienceModalPage } from './../../experience-modal/experience-modal.page';
import { ActivatedRoute, Router } from '@angular/router';
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

  update: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private localStorage: Storage,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalControl: ModalController
  ) {
    this.candidateForm = this.formBuilder.group({
      experiences: [[]]
    })
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userData = this.router.getCurrentNavigation().extras.state.user_data
        this.candidateForm.patchValue(this.userData)
      }
    })
  }

  ngOnInit() {
  }

  removeExperience(id: any) {
    let newExperiences = this.candidateForm.get('experiences').value
    newExperiences.splice(id, 1)
    this.candidateForm.get('experiences').setValue(newExperiences)
    this.localStorage.set('experiences', JSON.stringify(newExperiences))
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

  goToRevision() {
    this.userData.experiences = this.candidateForm.get('experiences').value
    this.router.navigate(['/candidate-update/revision'], { state: { user_data: this.userData } })
  }

  nextPage() {
    this.userData.experiences = this.candidateForm.get('experiences').value
    this.router.navigate(['/candidate-update/presentation'], { state: { user_data: this.userData } })
  }

}
