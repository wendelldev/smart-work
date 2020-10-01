import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScholarityPageRoutingModule } from './scholarity-routing.module';

import { ScholarityPage } from './scholarity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ScholarityPageRoutingModule
  ],
  declarations: [ScholarityPage]
})
export class ScholarityPageModule {}
