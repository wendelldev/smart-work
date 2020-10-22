import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.candidateForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      linkedInUrl: [null],
      birthday: [null, [Validators.required, Validators.minLength(10)]],
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
    this.userData.name = this.candidateForm.get('name').value
    this.userData.linkedInUrl = this.candidateForm.get('linkedInUrl').value
    this.userData.birthday = this.candidateForm.get('birthday').value

    this.router.navigate(['/candidate-update/revision'], { state: { user_data: this.userData} })
  }

  nextPage() {
    this.userData.name = this.candidateForm.get('name').value
    this.userData.linkedInUrl = this.candidateForm.get('linkedInUrl').value
    this.userData.birthday = this.candidateForm.get('birthday').value

    this.router.navigate(['/candidate-update/contact'], { state: { user_data: this.userData } })
  }

}
