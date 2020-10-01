import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-experience-modal',
  templateUrl: './experience-modal.page.html',
  styleUrls: ['./experience-modal.page.scss'],
})
export class ExperienceModalPage implements OnInit {

  experienceForm: FormGroup

  experiences: Array<any> = []

  constructor(
    private formBuilder: FormBuilder,
    private localStorage: Storage,
    private modalControl: ModalController
  ) { }

  ngOnInit() {

    this.experienceForm = this.formBuilder.group({
      company_name: [null, [Validators.required]],
      begin_date: [null, Validators.required],
      end_date: [null, Validators.required],
      occupation: [null, Validators.required],
      observation: [null]
    })
  }

  async ionViewWillEnter() {
    const experiences = JSON.parse(await this.localStorage.get('experiences'))
    if (experiences) {
      this.experiences = experiences
    }
  }

  addExperience() {
    this.experiences.push(this.experienceForm.value)
    this.localStorage.set('experiences', JSON.stringify(this.experiences))
    this.modalControl.dismiss()
  }

  cancel() {
    this.modalControl.dismiss()
  }

}
