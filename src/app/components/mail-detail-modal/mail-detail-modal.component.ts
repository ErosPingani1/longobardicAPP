import { Component, Input, OnInit } from '@angular/core';
import { Mail } from 'src/app/models/mail';
import { HomepageService } from 'src/app/services/homepage/homepage.service';
import { MailboxService } from 'src/app/services/mailbox/mailbox.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-mail-detail-modal',
  templateUrl: './mail-detail-modal.component.html',
  styleUrls: ['./mail-detail-modal.component.scss'],
})
export class MailDetailModalComponent implements OnInit {

  @Input() selectedMail: Mail;

  protected sortedMail = [];

  constructor(
    private storageService: StorageService,
    private homepageService: HomepageService,
    private mailboxService: MailboxService
  ) { }

  ngOnInit() {
    this.selectedMail.new = false;
    this.storageService.setCollection('1', JSON.stringify(this.storageService.cachedCollections['1']))
      .then(() => {
        this.homepageService.updateBadgeValue();
      }
    );
    this.sortedMail = this.mailboxService.sortMailDetailContent(this.selectedMail);
  }

}
