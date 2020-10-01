import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PresentationPageRoutingModule } from './presentation-routing.module';

import { PresentationPage } from './presentation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PresentationPageRoutingModule
  ],
  declarations: [PresentationPage]
})
export class PresentationPageModule {}
