import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.page.html',
  styleUrls: ['../candidate-update.page.scss'],
})
export class PresentationPage implements OnInit {

  candidateForm: FormGroup
  userData: any

  update: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.candidateForm = this.formBuilder.group({
      presentation_text: [null]
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

  nextPage() {
    this.userData.presentation_text = this.candidateForm.get('presentation_text').value
    this.router.navigate(['/candidate-update/revision'], { state: { user_data: this.userData } })
  }

}
