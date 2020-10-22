import { Router, ActivatedRoute } from '@angular/router';
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

  update = false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.candidateForm = this.formBuilder.group({
      residencial_phone: [null, [Validators.minLength(14)]],
      mobile_phone: [null, [Validators.required, Validators.minLength(15)]],
    })
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userData = this.router.getCurrentNavigation().extras.state.user_data
        this.candidateForm.patchValue(this.userData)
      }
    })
  }

  ngOnInit() {
  }

  goToRevision() {
    this.userData.residencial_phone = this.candidateForm.get('residencial_phone').value
    this.userData.mobile_phone = this.candidateForm.get('mobile_phone').value

    this.router.navigate(['/candidate-update/revision'], { state: { user_data: this.userData} })
  }

  nextPage() {
    this.userData.residencial_phone = this.candidateForm.get('residencial_phone').value
    this.userData.mobile_phone = this.candidateForm.get('mobile_phone').value

    this.router.navigate(['/candidate-update/location'], { state: { user_data: this.userData } })
  }

}
