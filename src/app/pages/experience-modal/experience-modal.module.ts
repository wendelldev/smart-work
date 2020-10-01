import { BrMaskerModule } from 'br-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExperienceModalPageRoutingModule } from './experience-modal-routing.module';

import { ExperienceModalPage } from './experience-modal.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    BrMaskerModule,
    ExperienceModalPageRoutingModule
  ],
  declarations: [ExperienceModalPage]
})
export class ExperienceModalPageModule {}
