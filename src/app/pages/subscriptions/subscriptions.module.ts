import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscriptionsPageRoutingModule } from './subscriptions-routing.module';

import { SubscriptionsPage } from './subscriptions.page';
import { SubscriptionCardComponent } from 'src/app/components/subscription-card/subscription-card.component';
import { FilterSubscriptionsPopoverComponent } from 'src/app/components/filter-subscriptions-popover/filter-subscriptions-popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriptionsPageRoutingModule
  ],
  declarations: [SubscriptionsPage, SubscriptionCardComponent, FilterSubscriptionsPopoverComponent]
})
export class SubscriptionsPageModule {}
