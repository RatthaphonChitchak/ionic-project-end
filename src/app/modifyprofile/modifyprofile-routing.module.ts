import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyprofilePage } from './modifyprofile.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyprofilePageRoutingModule {}
