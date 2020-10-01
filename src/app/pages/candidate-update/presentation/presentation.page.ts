import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.page.html',
  styleUrls: ['../candidate-update.page.scss'],
})
export class PresentationPage implements OnInit {

  candidateForm: FormGroup
  userData: any

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private localStorage: Storage
  ) { }

  ngOnInit() {
    this.candidateForm = this.formBuilder.group({
      presentation_text: [null]
    })
  }

  async ionViewWillEnter() {
    await this.localStorage.get('user_data')
      .then(data => {
        this.userData = JSON.parse(data)
        this.candidateForm.patchValue(this.userData)
      })
  }

  nextPage() {
    this.userData.presentation_text = this.candidateForm.get('presentation_text').value

    this.localStorage.set('user_data', JSON.stringify(this.userData))
    this.router.navigate(['/candidate-update/revision'])
  }

}
