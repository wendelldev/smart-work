import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['../candidate-update.page.scss'],
})
export class ContactPage implements OnInit {

  candidateForm: FormGroup
  userData: any

  constructor(
    private formBuilder: FormBuilder,
    private localStorage: Storage,
    private router: Router
  ) { }

  ngOnInit() {
    this.candidateForm = this.formBuilder.group({
      residencial_phone: [null, [Validators.minLength(14)]],
      mobile_phone: [null, [Validators.required, Validators.minLength(15)]],
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
    this.userData.residencial_phone = this.candidateForm.get('residencial_phone').value
    this.userData.mobile_phone = this.candidateForm.get('mobile_phone').value

    this.localStorage.set('user_data', JSON.stringify(this.userData))
    this.router.navigate(['/candidate-update/location'])
  }

}
