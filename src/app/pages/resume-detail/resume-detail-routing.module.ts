import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumeDetailPage } from './resume-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ResumeDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumeDetailPageRoutingModule {}
