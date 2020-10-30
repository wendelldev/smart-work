import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VacanciesPageRoutingModule } from './vacancies-routing.module';

import { VacanciesPage } from './vacancies.page';
import { VacancyCardComponent } from 'src/app/components/vacancy-card/vacancy-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VacanciesPageRoutingModule
  ],
  declarations: [VacanciesPage, VacancyCardComponent]
})
export class VacanciesPageModule {}
