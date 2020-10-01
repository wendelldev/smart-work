import { BrMaskerModule } from 'br-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalInfoPageRoutingModule } from './personal-info-routing.module';

import { PersonalInfoPage } from './personal-info.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    PersonalInfoPageRoutingModule,
    BrMaskerModule
  ],
  declarations: [PersonalInfoPage]
})
export class PersonalInfoPageModule {}
