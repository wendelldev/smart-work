import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContractorUpdatePageRoutingModule } from './contractor-update-routing.module';

import { ContractorUpdatePage } from './contractor-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContractorUpdatePageRoutingModule
  ],
  declarations: [ContractorUpdatePage]
})
export class ContractorUpdatePageModule {}
