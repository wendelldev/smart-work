import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscriptionsPageRoutingModule } from './subscriptions-routing.module';

import { SubscriptionsPage } from './subscriptions.page';
import { SubscriptionCardComponent } from 'src/app/components/subscription-card/subscription-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriptionsPageRoutingModule
  ],
  declarations: [SubscriptionsPage, SubscriptionCardComponent]
})
export class SubscriptionsPageModule {}
