import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvatarProfilePageRoutingModule } from './avatar-profile-routing.module';

import { AvatarProfilePage } from './avatar-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvatarProfilePageRoutingModule
  ],
  declarations: [AvatarProfilePage]
})
export class AvatarProfilePageModule {}
