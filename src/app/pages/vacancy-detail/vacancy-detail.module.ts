import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VacancyDetailPageRoutingModule } from './vacancy-detail-routing.module';

import { VacancyDetailPage } from './vacancy-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VacancyDetailPageRoutingModule
  ],
  declarations: [VacancyDetailPage]
})
export class VacancyDetailPageModule {}
