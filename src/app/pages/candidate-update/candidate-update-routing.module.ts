import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidateUpdatePage } from './candidate-update.page';

const routes: Routes = [
  {
    path: '',
    component: CandidateUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateUpdatePageRoutingModule {}
