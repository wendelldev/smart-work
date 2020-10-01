import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QualificationsPageRoutingModule } from './qualifications-routing.module';

import { QualificationsPage } from './qualifications.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    QualificationsPageRoutingModule
  ],
  declarations: [QualificationsPage]
})
export class QualificationsPageModule {}
