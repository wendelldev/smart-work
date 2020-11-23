import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-subscription-modal',
  templateUrl: './confirm-subscription-modal.component.html',
  styleUrls: ['./confirm-subscription-modal.component.scss'],
})
export class ConfirmSubscriptionModalComponent implements OnInit {

  @Input() text: string

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  disagree() {
    this.modalController.dismiss(false)
  }

  agree() {
    this.modalController.dismiss(true)
  }

}
