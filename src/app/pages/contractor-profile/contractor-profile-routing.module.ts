import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractorProfilePage } from './contractor-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ContractorProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractorProfilePageRoutingModule {}
