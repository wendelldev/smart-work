import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'recover-password',
    loadChildren: () => import('./pages/recover-password/recover-password.module').then( m => m.RecoverPasswordPageModule)
  },
  {
    path: 'email-verification',
    loadChildren: () => import('./pages/email-verification/email-verification.module').then( m => m.EmailVerificationPageModule)
  },
  {
    path: 'candidate-update',
    loadChildren: () => import('./pages/candidate-update/candidate-update.module').then( m => m.CandidateUpdatePageModule)
  },
  {
    path: 'experience-modal',
    loadChildren: () => import('./pages/experience-modal/experience-modal.module').then( m => m.ExperienceModalPageModule)
  },
  {
    path: 'candidate-profile',
    loadChildren: () => import('./pages/candidate-profile/candidate-profile.module').then( m => m.CandidateProfilePageModule)
  },
  {
    path: 'contractor-profile',
    loadChildren: () => import('./pages/contractor-profile/contractor-profile.module').then( m => m.ContractorProfilePageModule)
  },
  {
    path: 'contractor-update',
    loadChildren: () => import('./pages/contractor-update/contractor-update.module').then( m => m.ContractorUpdatePageModule)
  },
  {
    path: 'registry-vacancy',
    loadChildren: () => import('./pages/registry-vacancy/registry-vacancy.module').then( m => m.RegistryVacancyPageModule)
  },
  {
    path: 'vacancies/:vacancyId',
    loadChildren: () => import('./pages/vacancy-detail/vacancy-detail.module').then( m => m.VacancyDetailPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
