import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumeDetailPageRoutingModule } from './resume-detail-routing.module';

import { ResumeDetailPage } from './resume-detail.page';
import { AccordionComponent } from 'src/app/components/accordion/accordion.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumeDetailPageRoutingModule
  ],
  declarations: [ResumeDetailPage, AccordionComponent]
})
export class ResumeDetailPageModule {}
