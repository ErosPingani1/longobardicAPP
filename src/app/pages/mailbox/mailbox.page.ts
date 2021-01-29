import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { MailDetailModalComponent } from 'src/app/components/mail-detail-modal/mail-detail-modal.component';
import { Mail } from 'src/app/models/mail';
import { StorageService } from 'src/app/services/storage/storage.service';

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.page.html',
  styleUrls: ['./mailbox.page.scss'],
})
export class MailboxPage implements OnInit {

  protected availableSegments = ['Mailbox', 'Archive'];
  protected selectedSegment = 'Mailbox';

  constructor(
    protected storageService: StorageService,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.resetBadgeCount();
  }

  /**
   * Method that clears notifications history and removes app badge
   */
  private resetBadgeCount() {
    PushNotifications.removeAllDeliveredNotifications();
  }

  protected segmentChanged(event: any): void {
    this.selectedSegment = event.detail.value;
  }

  protected async presentMailboxDetail(mail: Mail): Promise<void> {
    const modal = await this.modalController.create({
      component: MailDetailModalComponent,
      cssClass: 'mail-detail-modal',
      componentProps: {
        selectedMail: mail
      },
      mode: 'ios',
      animated: true,
      presentingElement: this.routerOutlet.nativeEl,
      swipeToClose: true,
      keyboardClose: true,
      backdropDismiss: true
    });
    await modal.present();
  }

}
