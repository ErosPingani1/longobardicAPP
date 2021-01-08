import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZorroPage } from './zorro.page';

const routes: Routes = [
  {
    path: '',
    component: ZorroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZorroPageRoutingModule {}
