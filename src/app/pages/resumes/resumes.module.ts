import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumesPageRoutingModule } from './resumes-routing.module';

import { ResumesPage } from './resumes.page';
import { ResumeCardComponent } from 'src/app/components/resume-card/resume-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumesPageRoutingModule
  ],
  declarations: [ResumesPage, ResumeCardComponent]
})
export class ResumesPageModule {}
