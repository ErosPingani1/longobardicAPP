import { Injectable } from '@angular/core';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  Capacitor
} from '@capacitor/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { Mail } from 'src/app/models/mail';
import { HomepageService } from '../homepage/homepage.service';

const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private router: Router,
    private storageService: StorageService,
    private homepageService: HomepageService
  ) { }

  /**
   * Method called in app component to register push notifications behavior on app loading
   * The registration function is fired only when the app is run on native devices (avoiding console errors on browser)
   */
  public initPush() {
    if (Capacitor.platform !== 'web') {
      this.registerPush();
    }
  }

  /**
   * Method that registers events on push notifications
   */
  private registerPush() {

    /**
     * Method that checks whether the app has permissions to receive push notifications
     */
    PushNotifications.requestPermission().then(
      (permission) => {
        if (permission.granted) {
          PushNotifications.register();
        }
      }
    );

    /**
     * Event on push notification error
     */
    PushNotifications.addListener(
      'registrationError',
      (error) => {
        console.log('Push registration error: ' + JSON.stringify(error));
      }
    );

    /**
     * Event on push notification registration
     */
    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        console.log('Push token: ' + JSON.stringify(token));
      }
    );

    /**
     * Event called when the device receives a push notification on foregrounded app
     */
    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotification) => {
        console.log('Push received: ', notification);
        console.log('Push data: ', JSON.parse(notification.data.content));
        this.checkNewNotificationAvailability(notification);
      }
    );

    /**
     * Event called on push notification click
     */
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: PushNotificationActionPerformed) => {
        const data = notification.notification.data;
        console.log('Action performed: ' + JSON.stringify(notification.notification));
        if (data.detailsId) {
          this.router.navigate(['/mailbox']); // Dopo lo slash inserire il tipo di notifica ricevuta
        }
        this.checkNewNotificationAvailability(notification.notification);
      }
    );
  }

  /**
   * Method that executes the check on a incoming notification and depending on the type
   * adds the information in the right cached collection
   * @param notification - PushNotification object (data received)
   */
  private checkNewNotificationAvailability(notification: PushNotification) {
    const pushData = JSON.parse(notification.data.content);
    const notificationType = pushData.notificationType;
    switch (notificationType) {
      case 1: { // mailbox
        const newMail = new Mail(pushData.arduinoInfo);
        this.storageService.cachedCollections[notificationType.toString()].push(newMail);
        console.log(`Updated mail collection in storage: `, this.storageService.cachedCollections[notificationType]);
        this.storageService.setCollection(notificationType.toString(),
          JSON.stringify(this.storageService.cachedCollections[pushData.notificationType]))
          .then(() => {
            console.log(`Mailbox collection updated, hoorray!`);
            this.homepageService.updateBadgeValue();
          });
      }
    }
  }

}
