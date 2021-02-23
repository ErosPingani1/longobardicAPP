import { Injectable } from '@angular/core';
import { Mail } from 'src/app/models/mail';
import { StorageService } from '../storage/storage.service';
import { formatDate } from '@angular/common';
import { ArduinoInfo } from 'src/app/models/arduino-info';
import { MailboxRepository } from 'src/app/repos/mailbox.repository';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MailboxService {

  constructor(
    private storageService: StorageService,
    private mailboxRepository: MailboxRepository,
    private toastController: ToastController
  ) { }

  private mailboxCollectionID = '1';

  private sessionArduinoInfo: ArduinoInfo;

  /**
   * Get the number of available new mails
   */
  public getNewNotificationsNumber(): number {
    const mailCollection = this.storageService.cachedCollections[this.mailboxCollectionID];
    return mailCollection.length > 0 ? mailCollection.filter(m => m.new === true).length : 0 ;
  }

  /**
   * Method that handles the toast error whenever the setSessionArduinoInfo call encounters a problem
   */
  public async showSetSessionErrorToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'There was an error getting device info, please try again',
      duration: 2500
    });
    toast.present();
  }

  /**
   * Method that sets a sessionArduinoInfo in order to get the data on app opening and store it in session storage
   */
  public setSessionArduinoInfo(): void {
    this.mailboxRepository.getDeviceStatus()
      .then(
        async (resp) => {
          if (resp.status === 'ok') {
            this.sessionArduinoInfo = resp.arduinoInfo;
          } else {
            this.showSetSessionErrorToast();
          }
        }
      ).catch(
        () => {
          this.showSetSessionErrorToast();
        }
      );
  }

  public getSessionArduinoInfo(): ArduinoInfo {
    return this.sessionArduinoInfo;
  }

  /**
   * Method that generate an object array from a specifil mail object
   * in order to print the mail properties as required in mail details modal.
   * The method also converts the date property as best displayed in modal.
   * @param mail - Mail object that has to be sorted
   */
  public sortMailDetailContent(mail: Mail): object[] {
    return [
      {
        key: 'location',
        value: mail.arduinoInfo.location
      },
      {
        key: 'date',
        value: formatDate(new Date(mail.arduinoInfo.date.replace(/(\d{2})-(\d{2})-(\d{2})/, '$2/$1/$3')), 'mediumDate', 'en-US')
      },
      {
        key: 'time',
        value: mail.arduinoInfo.time
      },
      {
        key: 'device',
        value: mail.arduinoInfo.device
      },
      {
        key: 'battery',
        value: mail.arduinoInfo.battery
      }
    ];
  }
}
