import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractorUpdatePage } from './contractor-update.page';

const routes: Routes = [
  {
    path: '',
    component: ContractorUpdatePage
  },
  {
    path: 'avatar-profile',
    loadChildren: () => import('./avatar-profile/avatar-profile.module').then( m => m.AvatarProfilePageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'location',
    loadChildren: () => import('./location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'informations',
    loadChildren: () => import('./informations/informations.module').then( m => m.InformationsPageModule)
  },
  {
    path: 'revision',
    loadChildren: () => import('./revision/revision.module').then( m => m.RevisionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractorUpdatePageRoutingModule {}
