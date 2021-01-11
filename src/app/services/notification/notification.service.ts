import { Injectable } from '@angular/core';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  Capacitor
} from '@capacitor/core';
import { Router } from '@angular/router';

const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private router: Router) { }

  /**
   * Method called in app component to register push notifications behavior on app loading
   * The registration function is fired only when the app is run on native devices (avoiding console errors on browser)
   */
  initPush() {
    if (Capacitor.platform !== 'web') {
      this.registerPush();
    }
  }

  /**
   * Method that registers events on push notifications
   */
  private registerPush() {
    PushNotifications.requestPermission().then(
      (permission) => {
        if (permission.granted) {
          PushNotifications.register();
        }
      }
    );

    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        console.log('Push token: ' + JSON.stringify(token));
      }
    );

    PushNotifications.addListener(
      'registrationError',
      (error) => {
        console.log('Push registration error: ' + JSON.stringify(error));
      }
    );

    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotification) => {
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: PushNotificationActionPerformed) => {
        const data = notification.notification.data;
        console.log('Action performed: ' + JSON.stringify(notification.notification));
        if (data.detailsId) {
          this.router.navigate(['/mailbox']);
        }
      }
    );
  }

}
