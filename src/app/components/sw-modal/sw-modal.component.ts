import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sw-modal',
  templateUrl: './sw-modal.component.html',
  styleUrls: ['./sw-modal.component.scss'],
})
export class SwModalComponent implements OnInit {

  @Input() text: string
  @Input() profile_updated: boolean
  @Input() user_type: string

  constructor(
    private modalControl: ModalController,
    private router: Router
  ) { }

  ngOnInit() {}

  dismiss() {
    this.modalControl.dismiss()
  }

  goToUpdateCandidate() {
    this.router.navigate(['/candidate-update/avatar-profile'])
    this.modalControl.dismiss()
  }

  goToUpdateContractor() {

  }

}
