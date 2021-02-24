import { Component, Input, OnInit } from '@angular/core';
import { ArduinoInfo } from 'src/app/models/arduino-info';

@Component({
  selector: 'app-mailbox-detail',
  templateUrl: './mailbox-detail.component.html',
  styleUrls: ['./mailbox-detail.component.scss'],
})
export class MailboxDetailComponent implements OnInit {

  @Input() mailboxDetail: ArduinoInfo;

  protected battery: number;

  constructor() { }

  ngOnInit() {
    this.battery = parseInt(this.mailboxDetail.battery);
  }

}
