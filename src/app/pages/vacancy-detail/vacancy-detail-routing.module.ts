import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacancyDetailPage } from './vacancy-detail.page';

const routes: Routes = [
  {
    path: '',
    component: VacancyDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacancyDetailPageRoutingModule {}
