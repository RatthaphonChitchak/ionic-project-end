import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChetPageRoutingModule } from './chet-routing.module';

import { ChetPage } from './chet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChetPageRoutingModule
  ],
  declarations: [ChetPage]
})
export class ChetPageModule {}
