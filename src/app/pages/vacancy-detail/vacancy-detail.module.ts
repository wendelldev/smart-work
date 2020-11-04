import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VacancyDetailPageRoutingModule } from './vacancy-detail-routing.module';

import { VacancyDetailPage } from './vacancy-detail.page';
import { SwModalComponent } from 'src/app/components/sw-modal/sw-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VacancyDetailPageRoutingModule
  ],
  declarations: [VacancyDetailPage, SwModalComponent]
})
export class VacancyDetailPageModule {}
