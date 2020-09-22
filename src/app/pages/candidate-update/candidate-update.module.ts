import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CandidateUpdatePageRoutingModule } from './candidate-update-routing.module';

import { CandidateUpdatePage } from './candidate-update.page';
import { BrMaskerModule } from 'br-mask'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BrMaskerModule,
    CandidateUpdatePageRoutingModule,
  ],
  declarations: [CandidateUpdatePage]
})
export class CandidateUpdatePageModule {}
