import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MailboxPage } from './mailbox.page';

const routes: Routes = [
  {
    path: '',
    component: MailboxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MailboxPageRoutingModule {}
