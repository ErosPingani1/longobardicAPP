import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class MailboxService {

  constructor(
    private storageService: StorageService
  ) { }

  private mailboxCollectionID = '1';

  /**
   * Get the number of available new mails
   */
  public getNewNotificationsNumber(): number {
    const mailCollection = this.storageService.cachedCollections[this.mailboxCollectionID];
    return mailCollection.length > 0 ? mailCollection.filter(m => m.new === true).length : 0 ;
  }
}
