import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MailboxPageRoutingModule } from './mailbox-routing.module';

import { MailboxPage } from './mailbox.page';
import { MailsArchiveEntryComponent } from 'src/app/components/mails-archive-entry/mails-archive-entry.component';
import { MailDetailModalComponent } from 'src/app/components/mail-detail-modal/mail-detail-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MailboxPageRoutingModule
  ],
  declarations: [
    MailboxPage,
    MailsArchiveEntryComponent,
    MailDetailModalComponent
  ],
  exports: [
    MailDetailModalComponent
  ]
})
export class MailboxPageModule {}
