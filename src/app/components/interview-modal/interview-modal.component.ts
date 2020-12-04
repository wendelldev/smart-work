import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'interview-modal',
  templateUrl: './interview-modal.component.html',
  styleUrls: ['./interview-modal.component.scss'],
})
export class InterviewModalComponent implements OnInit {

  infoForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController
  ) {
    this.infoForm = this.formBuilder.group({
      date: [null, Validators.required],
      time: [null, Validators.required],
      location: [null, Validators.required],
      observation: [null, Validators.required]
    })
  }

  ngOnInit() {}

  sendNotification() {
    const interviewData = this.infoForm.value
    interviewData.type = 'interview'

    this.modalController.dismiss(interviewData)
  }

  dismiss() {
    this.modalController.dismiss()
  }

}
