import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfectedPage } from './infected.page';

const routes: Routes = [
  {
    path: '',
    component: InfectedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfectedPageRoutingModule {}
