import { BrMaskerModule } from 'br-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExperiencesPageRoutingModule } from './experiences-routing.module';

import { ExperiencesPage } from './experiences.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ExperiencesPageRoutingModule,
    BrMaskerModule
  ],
  declarations: [ExperiencesPage]
})
export class ExperiencesPageModule {}
