import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.contractorForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.email]],
      comercial_phone: [null, [Validators.required, Validators.minLength(15)]],
      cnpj_cpf: [null, [Validators.required, Validators.minLength(14), Validators.maxLength(18)]]
    })
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userData = this.router.getCurrentNavigation().extras.state.user_data
        this.contractorForm.patchValue(this.userData)
      }
    })

  }

  ngOnInit() {
  }

  goToRevision() {
    this.userData.name = this.contractorForm.get('name').value
    this.userData.email = this.contractorForm.get('email').value
    this.userData.comercial_phone = this.contractorForm.get('comercial_phone').value
    this.userData.cnpj_cpf = this.contractorForm.get('cnpj_cpf').value

    this.router.navigate(['/contractor-update/revision'], { state: { user_data: this.userData } })
  }

  nextPage() {
    this.userData.name = this.contractorForm.get('name').value
    this.userData.email = this.contractorForm.get('email').value
    this.userData.comercial_phone = this.contractorForm.get('comercial_phone').value
    this.userData.cnpj_cpf = this.contractorForm.get('cnpj_cpf').value

    this.router.navigate(['/contractor-update/location'], { state: { user_data: this.userData } })
  }

}
