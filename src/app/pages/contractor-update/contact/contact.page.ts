import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['../contractor-update.page.scss'],
})
export class ContactPage implements OnInit {

  contractorForm: FormGroup
  userData: any

  constructor(
    private formBuilder: FormBuilder,
    private localStorage: Storage,
    private router: Router
  ) { }

  ngOnInit() {
    this.contractorForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.email]],
      comercial_phone: [null, [Validators.required, Validators.minLength(15)]],
      cnpj_cpf: [null, [Validators.required, Validators.minLength(14), Validators.maxLength(18)]]
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
    this.userData.name = this.contractorForm.get('name').value
    this.userData.email = this.contractorForm.get('email').value
    this.userData.comercial_phone = this.contractorForm.get('comercial_phone').value
    this.userData.cnpj_cpf = this.contractorForm.get('cnpj_cpf').value

    this.localStorage.set('user_data', JSON.stringify(this.userData))
    this.router.navigate(['/contractor-update/location'])
  }

}
