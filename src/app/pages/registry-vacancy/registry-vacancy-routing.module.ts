import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistryVacancyPage } from './registry-vacancy.page';

const routes: Routes = [
  {
    path: '',
    component: RegistryVacancyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistryVacancyPageRoutingModule {}
