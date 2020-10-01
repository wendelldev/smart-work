import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qualifications',
  templateUrl: './qualifications.page.html',
  styleUrls: ['../candidate-update.page.scss'],
})
export class QualificationsPage implements OnInit {

  candidateForm: FormGroup
  userData: any

  constructor(
    private formBuilder: FormBuilder,
    private localStorage: Storage,
    private router: Router
  ) { }

  ngOnInit() {
    this.candidateForm = this.formBuilder.group({
      qualifications: [null, Validators.required],
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
    this.userData.qualifications = this.candidateForm.get('qualifications').value

    this.localStorage.set('user_data', JSON.stringify(this.userData))
    this.router.navigate(['/candidate-update/experiences'])
  }

}
