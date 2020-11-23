import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscriptionDetailPageRoutingModule } from './subscription-detail-routing.module';

import { SubscriptionDetailPage } from './subscription-detail.page';
import { AccordionComponent } from 'src/app/components/accordion/accordion.component';
import { ConfirmSubscriptionModalComponent } from 'src/app/components/confirm-subscription-modal/confirm-subscription-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriptionDetailPageRoutingModule
  ],
  declarations: [SubscriptionDetailPage, AccordionComponent, ConfirmSubscriptionModalComponent]
})
export class SubscriptionDetailPageModule {}
