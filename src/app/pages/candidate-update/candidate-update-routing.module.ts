import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidateUpdatePage } from './candidate-update.page';

const routes: Routes = [
  {
    path: '',
    component: CandidateUpdatePage
  },
  {
    path: 'avatar-profile',
    loadChildren: () => import('./avatar-profile/avatar-profile.module').then( m => m.AvatarProfilePageModule)
  },
  {
    path: 'personal-info',
    loadChildren: () => import('./personal-info/personal-info.module').then( m => m.PersonalInfoPageModule)
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
    path: 'scholarity',
    loadChildren: () => import('./scholarity/scholarity.module').then( m => m.ScholarityPageModule)
  },
  {
    path: 'qualifications',
    loadChildren: () => import('./qualifications/qualifications.module').then( m => m.QualificationsPageModule)
  },
  {
    path: 'experiences',
    loadChildren: () => import('./experiences/experiences.module').then( m => m.ExperiencesPageModule)
  },
  {
    path: 'presentation',
    loadChildren: () => import('./presentation/presentation.module').then( m => m.PresentationPageModule)
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
export class CandidateUpdatePageRoutingModule {}
