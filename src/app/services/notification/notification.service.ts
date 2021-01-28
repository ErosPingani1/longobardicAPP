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
import { ArduinoInfo } from 'src/app/models/arduino-info';
import { formatDate } from '@angular/common';
import { ToastController } from '@ionic/angular';

const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private router: Router,
    private storageService: StorageService,
    private homepageService: HomepageService,
    private toastController: ToastController
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
     * Event on push notification functionality registration
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
        if (data.detailsId) {
          this.router.navigate(['/mailbox']); // Dopo lo slash inserire il tipo di notifica ricevuta
        }
        setTimeout(() => { // Timeout set to be sure that when push is clicked on app closed the cache is already available
          this.checkNewNotificationAvailability(notification.notification);
        }, 500);
      }
    );
  }

  /**
   * Method that executes the check on a incoming notification and depending on the type
   * adds the information in the right cached collection
   * @param notification - PushNotification object (data received)
   */
  private async checkNewNotificationAvailability(notification: PushNotification) {
    const pushData = JSON.parse(notification.data.content);
    const notificationType = pushData.notificationType;
    switch (notificationType) {
      case 1: { // mailbox
        const newMail = new Mail(pushData.arduinoInfo);
        this.storageService.cachedCollections[notificationType.toString()].push(newMail);
        this.storageService.setCollection(notificationType.toString(),
          JSON.stringify(this.storageService.cachedCollections[pushData.notificationType]))
          .then(() => {
            this.homepageService.updateBadgeValue();
          });
        const toast = await this.toastController.create({
          message: 'New mail received',
          duration: 2000
        });
        toast.present();
      }
    }
  }

  /**
   * These method is necessary to correctly manage the notifications received when the app is backgrounded.
   * Thanks to PushNotifications.getDeliveredNotifications() it is possible to get the list of available
   * notifications in system tray, but due to security reasons the passed data stored in content are not accessible.
   * That's why it is required to create the correct type of notification manually, in order to pass it to checkNotificationAvailability()
   */
  private generateNotificationscontentForTypeAndCheck(availableNotifications: PushNotification[]) {
    const mailboxTitle = 'De pusc notifichescio';
    // const zorroTitle = '';
    availableNotifications.forEach(
      (n) => {
        switch (n.title) {
          case mailboxTitle: { // In case the notification has a mailbox title
            n.data = {
              content: JSON.stringify({
                // Arduino info object created with current date and time and last battery read (100 if first)
                arduinoInfo: new ArduinoInfo(
                  formatDate(new Date(), 'dd-MM-yy', 'en-US'),
                  new Date().toLocaleTimeString('it-IT', {hour12: false, hour: 'numeric', minute: 'numeric'}),
                  this.storageService.cachedCollections['1'].length > 0
                    ? this.storageService.cachedCollections['1'][this.storageService.cachedCollections['1'].length - 1].arduinoInfo.battery
                    : '100',
                    this.storageService.cachedCollections['1'].length > 0
                    ? this.storageService.cachedCollections['1'][this.storageService.cachedCollections['1'].length - 1].arduinoInfo.location
                    : 'Fara Gera d\'Adda',
                ),
                message: 'New mail registered',
                notificationType: 1,
                status: 'ok'
              })
            };
            this.checkNewNotificationAvailability(n);
          }
        }
      }
    );
    PushNotifications.removeAllDeliveredNotifications();
  }

  /**
   * Method automatically called when app is resumed from background or opened
   * App component is in fact subscribed to app status change
   */
  public checkNotificationsOnAppOpeningOrBackToForeground() {
    PushNotifications.getDeliveredNotifications()
    .then((pushList) => {
      const availableNotifications = pushList.notifications;
      if (availableNotifications.length > 0) {
        this.generateNotificationscontentForTypeAndCheck(availableNotifications);
      }
    });
  }

}
