import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Mail } from 'src/app/models/mail';

@Injectable()
@Component({
  selector: 'app-mail-entry',
  templateUrl: './mails-archive-entry.component.html',
  styleUrls: ['./mails-archive-entry.component.scss'],
})
export class MailsArchiveEntryComponent implements OnInit {

  @Input() mail: Mail;

  constructor() { }

  ngOnInit() {
    console.log(this.mail);
  }

}
