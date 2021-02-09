import { Component, OnInit, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { IonRouterOutlet, IonSlides, ModalController } from '@ionic/angular';
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

  @ViewChild('slides', { static: true }) slider: IonSlides;

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

  protected async segmentChanged(event: any): Promise<void> {
    this.selectedSegment = event.detail.value;
    this.slider.slideTo(this.availableSegments.indexOf(this.selectedSegment));
  }

  protected async slideChanged(): Promise<void> {
    const segment = await this.slider.getActiveIndex();
    this.selectedSegment = this.availableSegments[segment];
  }

  protected async presentMailboxDetail(mail: Mail): Promise<void> {
    const modal = await this.modalController.create({
      component: MailDetailModalComponent,
      cssClass: 'mail-detail-modal',
      componentProps: {
        selectedMail: mail
      },
      mode: 'ios',
      presentingElement: this.routerOutlet.nativeEl,
      swipeToClose: true
    });
    await modal.present();
  }

}
