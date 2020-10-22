import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.contractorForm = this.formBuilder.group({
      description: [null, Validators.required],
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

  nextPage() {
    this.userData.description = this.contractorForm.get('description').value

    this.router.navigate(['/contractor-update/revision'], { state: { user_data: this.userData } })
  }

}
