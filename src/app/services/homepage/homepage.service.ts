import { Injectable } from '@angular/core';
import { MailboxService } from '../mailbox/mailbox.service';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(
    private mailboxService: MailboxService
  ) { }

  /**
   * Homepage service value that gets the number of new notifications from Mailbox service
   */
  public checkNewMailsValue() {
    return this.mailboxService.getNewNotificationsNumber();
  }

}
