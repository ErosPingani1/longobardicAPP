import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.page.html',
  styleUrls: ['./mailbox.page.scss'],
})
export class MailboxPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.resetBadgeCount();
  }

  /**
   * Method that clears notifications history and removes app badge
   */
  resetBadgeCount() {
    PushNotifications.removeAllDeliveredNotifications();
  }

}
