import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['../candidate-update.page.scss'],
})
export class PersonalInfoPage implements OnInit {

  candidateForm: FormGroup
  userData: any

  constructor(
    private formBuilder: FormBuilder,
    private localStorage: Storage,
    private router: Router
  ) { }

  ngOnInit() {
    this.candidateForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      linkedInUrl: [null],
      birthday: [null, [Validators.required, Validators.minLength(10)]],
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
    this.userData.name = this.candidateForm.get('name').value
    this.userData.linkedInUrl = this.candidateForm.get('linkedInUrl').value
    this.userData.birthday = this.candidateForm.get('birthday').value

    this.localStorage.set('user_data', JSON.stringify(this.userData))
    this.router.navigate(['/candidate-update/contact'])
  }

}
