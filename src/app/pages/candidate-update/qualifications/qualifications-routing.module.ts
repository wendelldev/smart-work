import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QualificationsPage } from './qualifications.page';

const routes: Routes = [
  {
    path: '',
    component: QualificationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QualificationsPageRoutingModule {}
