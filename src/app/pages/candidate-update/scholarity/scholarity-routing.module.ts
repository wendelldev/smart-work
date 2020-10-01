import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScholarityPage } from './scholarity.page';

const routes: Routes = [
  {
    path: '',
    component: ScholarityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScholarityPageRoutingModule {}
