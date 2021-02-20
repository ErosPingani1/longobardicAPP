import { Injectable } from '@angular/core';
import { Mail } from 'src/app/models/mail';
import { StorageService } from '../storage/storage.service';
import { formatDate } from '@angular/common';
import { ArduinoInfo } from 'src/app/models/arduino-info';
import { MailboxRepository } from 'src/app/repos/mailbox.repository';

@Injectable({
  providedIn: 'root'
})
export class MailboxService {

  constructor(
    private storageService: StorageService,
    private mailboxRepository: MailboxRepository
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

  public setSessionArduinoInfo(): void {
    // Chiamata al repository che chiama il backend sul raspberry
    this.mailboxRepository.getDeviceStatus().subscribe(
      (resp) => {
        console.log('This is getStatus response: ', resp);
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
