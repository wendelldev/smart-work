import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumesPage } from './resumes.page';

const routes: Routes = [
  {
    path: '',
    component: ResumesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumesPageRoutingModule {}
