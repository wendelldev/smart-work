import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscriptionsPageRoutingModule } from './subscriptions-routing.module';

import { SubscriptionsPage } from './subscriptions.page';
import { SubscriptionCardComponent } from 'src/app/components/subscription-card/subscription-card.component';
import { FilterSubscriptionsPopoverComponent } from 'src/app/components/filter-subscriptions-popover/filter-subscriptions-popover.component';
import { InterviewModalComponent } from 'src/app/components/interview-modal/interview-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SubscriptionsPageRoutingModule
  ],
  declarations: [
    SubscriptionsPage,
    SubscriptionCardComponent,
    FilterSubscriptionsPopoverComponent,
    InterviewModalComponent
  ]
})
export class SubscriptionsPageModule {}
