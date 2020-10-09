import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.page.html',
  styleUrls: ['../contractor-update.page.scss'],
})
export class InformationsPage implements OnInit {

  contractorForm: FormGroup
  userData: any

  constructor(
    private formBuilder: FormBuilder,
    private localStorage: Storage,
    private router: Router
  ) { }

  ngOnInit() {
    this.contractorForm = this.formBuilder.group({
      description: [null, Validators.required],
    })
  }

  async ionViewWillEnter() {
    await this.localStorage.get('user_data')
      .then(data => {
        this.userData = JSON.parse(data)
        this.contractorForm.patchValue(this.userData)
      })
  }

  nextPage() {
    this.userData.description = this.contractorForm.get('description').value

    this.localStorage.set('user_data', JSON.stringify(this.userData))
    this.router.navigate(['/contractor-update/revision'])
  }

}
