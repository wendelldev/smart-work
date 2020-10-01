import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvatarProfilePage } from './avatar-profile.page';

const routes: Routes = [
  {
    path: '',
    component: AvatarProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvatarProfilePageRoutingModule {}
