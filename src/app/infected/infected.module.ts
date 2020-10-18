import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfectedPageRoutingModule } from './infected-routing.module';

import { InfectedPage } from './infected.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfectedPageRoutingModule
  ],
  declarations: [InfectedPage]
})
export class InfectedPageModule {}
