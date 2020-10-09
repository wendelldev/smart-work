import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CandidateProfilePageRoutingModule } from './candidate-profile-routing.module';

import { CandidateProfilePage } from './candidate-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CandidateProfilePageRoutingModule
  ],
  declarations: [CandidateProfilePage]
})
export class CandidateProfilePageModule {}
