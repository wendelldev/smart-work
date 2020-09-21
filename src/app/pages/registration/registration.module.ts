import { SwModalComponent } from './../../components/sw-modal/sw-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationPageRoutingModule } from './registration-routing.module';

import { RegistrationPage } from './registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistrationPageRoutingModule
  ],
  declarations: [RegistrationPage, SwModalComponent]
})
export class RegistrationPageModule {}
