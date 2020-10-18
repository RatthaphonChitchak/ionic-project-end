import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChetPage } from './chet.page';

const routes: Routes = [
  {
    path: '',
    component: ChetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChetPageRoutingModule {}
