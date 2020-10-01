import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scholarity',
  templateUrl: './scholarity.page.html',
  styleUrls: ['../candidate-update.page.scss'],
})
export class ScholarityPage implements OnInit {

  candidateForm: FormGroup
  userData: any

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private localStorage: Storage
  ) { }

  ngOnInit() {
    this.candidateForm = this.formBuilder.group({
      actuation_area: [null, Validators.required],
      scholarity: [null, Validators.required],
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
    this.userData.scholarity = this.candidateForm.get('scholarity').value
    this.userData.actuation_area = this.candidateForm.get('actuation_area').value

    this.localStorage.set('user_data', JSON.stringify(this.userData))
    this.router.navigate(['/candidate-update/qualifications'])
  }

}
