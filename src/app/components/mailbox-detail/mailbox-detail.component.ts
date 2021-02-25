import { Component, Input, OnInit } from '@angular/core';
import { MailboxStatus } from 'src/app/models/mailbox-status';

@Component({
  selector: 'app-mailbox-detail',
  templateUrl: './mailbox-detail.component.html',
  styleUrls: ['./mailbox-detail.component.scss'],
})
export class MailboxDetailComponent implements OnInit {

  @Input() mailboxStatus: MailboxStatus;

  constructor() { }

  ngOnInit() { }

}
