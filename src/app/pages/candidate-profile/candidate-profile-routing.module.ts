import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidateProfilePage } from './candidate-profile.page';

const routes: Routes = [
  {
    path: '',
    component: CandidateProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateProfilePageRoutingModule {}
