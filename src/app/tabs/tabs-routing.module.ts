import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'vacancies',
        loadChildren: () => import('../pages/vacancies/vacancies.module').then(m => m.VacanciesPageModule)
      },
      {
        path: 'resumes',
        loadChildren: () => import('../pages/resumes/resumes.module').then(m => m.ResumesPageModule)
      },
      {
        path: 'candidate-profile',
        loadChildren: () => import('../pages/candidate-profile/candidate-profile.module').then(m => m.CandidateProfilePageModule)
      },
      {
        path: 'contractor-profile',
        loadChildren: () => import('../pages/contractor-profile/contractor-profile.module').then(m => m.ContractorProfilePageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
