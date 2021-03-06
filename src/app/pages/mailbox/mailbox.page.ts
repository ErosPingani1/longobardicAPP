import { Component, OnInit, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { IonRouterOutlet, IonSlides, ModalController } from '@ionic/angular';
import { MailDetailModalComponent } from 'src/app/components/mail-detail-modal/mail-detail-modal.component';
import { Mail } from 'src/app/models/mail';
import { MailboxStatus } from 'src/app/models/mailbox-status';
import { MailboxService } from 'src/app/services/mailbox/mailbox.service';
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
  protected mailboxStatus: MailboxStatus;
  protected buttonStatus: string;
  protected buttonVariants = {
    stop: { color: 'danger', text: 'Stop Recording' },
    resume: { color: 'success', text: 'Resume Recording' }
  };

  constructor(
    protected storageService: StorageService,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private mailboxService: MailboxService
  ) { }

  ngOnInit() {
    this.mailboxStatus = this.mailboxService.getSessionMailboxStatus();
    this.buttonStatus = this.mailboxStatus.recording ? 'stop' : 'resume';
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

  /**
   * Method that sets the new selected segment in toolbar and slides to it
   * @param event - event emitted on segment select
   */
  protected async segmentChanged(event: any): Promise<void> {
    this.selectedSegment = event.detail.value;
    this.slider.slideTo(this.availableSegments.indexOf(this.selectedSegment));
  }

  /**
   * Slide event management method that sets a new segment on page slide
   */
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
