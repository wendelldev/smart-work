import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExperienceModalPage } from './experience-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ExperienceModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExperienceModalPageRoutingModule {}
