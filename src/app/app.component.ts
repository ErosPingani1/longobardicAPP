import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { StorageService } from './services/storage/storage.service';
import { HomepageService } from './services/homepage/homepage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private notificationService: NotificationService,
    private storageService: StorageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.notificationService.initPush();
      this.checkStorage(3);
    });
  }

  /**
   * Method that checks if storage collections are already available (they're not only on first time app startup)
   * if a collection is available it is automatically added to cached local array, otherwise the collection is set and then
   * added to cached files
   * @param availableCollections - number of stored collections of data (1 - Mailbox, 2 - Zorro, 3 - Trash)
   */
  private checkStorage(availableCollections: number) {
    for (let i = 0; i < availableCollections; i++) {
      const collectionKey = (i + 1).toString();
      this.storageService.getCollection(collectionKey)
      .then((collection) => {
        if (collection != null) {
          console.log(`Collection ${i + 1} already available, added to cached collections`);
          this.storageService.cachedCollections[i + 1] = collection;
        } else {
          this.storageService.setCollection(collectionKey, JSON.stringify([]))
          .then(() => {
            console.log(`Collection ${i + 1} created, hoorray!`);
            this.storageService.getCollection(collectionKey)
            .then((savedCollection) => {
              this.storageService.cachedCollections[i + 1] = savedCollection;
              console.log(`Collection ${i + 1} added to cached collections after creation`);
            });
          });
        }
      });
    }
  }

}
