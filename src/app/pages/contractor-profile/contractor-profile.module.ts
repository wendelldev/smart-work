import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContractorProfilePageRoutingModule } from './contractor-profile-routing.module';

import { ContractorProfilePage } from './contractor-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContractorProfilePageRoutingModule
  ],
  declarations: [ContractorProfilePage]
})
export class ContractorProfilePageModule {}
