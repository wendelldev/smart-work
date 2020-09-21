import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sw-modal',
  templateUrl: './sw-modal.component.html',
  styleUrls: ['./sw-modal.component.scss'],
})
export class SwModalComponent implements OnInit {

  constructor(
    private modalControl: ModalController
  ) { }

  ngOnInit() {}

  dismiss() {
    this.modalControl.dismiss()
  }

}
