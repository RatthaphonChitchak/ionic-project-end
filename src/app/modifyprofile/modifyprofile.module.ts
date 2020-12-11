import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyprofilePageRoutingModule } from './modifyprofile-routing.module';

import { ModifyprofilePage } from './modifyprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifyprofilePageRoutingModule
  ],
  declarations: [ModifyprofilePage]
})
export class ModifyprofilePageModule {}
