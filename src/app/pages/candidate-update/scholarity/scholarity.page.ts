import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
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

  update: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localStorage: Storage
  ) {
    this.candidateForm = this.formBuilder.group({
      actuation_area: [null, Validators.required],
      scholarity: [null, Validators.required],
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
    this.userData.scholarity = this.candidateForm.get('scholarity').value
    this.userData.actuation_area = this.candidateForm.get('actuation_area').value
    this.router.navigate(['/candidate-update/revision'], { state: { user_data: this.userData } })
  }

  nextPage() {
    this.userData.scholarity = this.candidateForm.get('scholarity').value
    this.userData.actuation_area = this.candidateForm.get('actuation_area').value
    this.router.navigate(['/candidate-update/qualifications'], { state: { user_data: this.userData } })
  }

}
