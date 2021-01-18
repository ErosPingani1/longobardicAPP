import { Injectable } from '@angular/core';
import { MailboxService } from '../mailbox/mailbox.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  newMailsValue: number;

  newMailsChange: Subject<number> = new Subject<number>();

  constructor(
    private mailboxService: MailboxService,
  ) { }

  /**
   * Homepage service value that gets the number of new notifications from Mailbox service
   */
  public checkNewMailsValue(): number {
    return this.mailboxService.getNewNotificationsNumber();
  }

  /**
   * Method that fires the event declared in newMailsChange with next() to let know all the
   * subscribers the new value of new mails
   */
  public updateBadgeValue(): void {
    this.newMailsValue = this.checkNewMailsValue();
    this.newMailsChange.next(this.newMailsValue);
  }

}
