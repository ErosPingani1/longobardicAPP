import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MailboxPageRoutingModule } from './mailbox-routing.module';

import { MailboxPage } from './mailbox.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MailboxPageRoutingModule
  ],
  declarations: [MailboxPage]
})
export class MailboxPageModule {}
