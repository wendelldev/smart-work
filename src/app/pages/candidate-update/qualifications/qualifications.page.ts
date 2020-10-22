import { ActivatedRoute, Router } from '@angular/router';
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

  update: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ) {
    this.candidateForm = this.formBuilder.group({
      qualifications: [null, Validators.required],
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
    this.userData.qualifications = this.candidateForm.get('qualifications').value
    this.router.navigate(['/candidate-update/revision'], { state: { user_data: this.userData } })
  }

  nextPage() {
    this.userData.qualifications = this.candidateForm.get('qualifications').value
    this.router.navigate(['/candidate-update/experiences'], { state: { user_data: this.userData } })
  }

}
