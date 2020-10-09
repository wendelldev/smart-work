import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumesPageRoutingModule } from './resumes-routing.module';

import { ResumesPage } from './resumes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumesPageRoutingModule
  ],
  declarations: [ResumesPage]
})
export class ResumesPageModule {}
