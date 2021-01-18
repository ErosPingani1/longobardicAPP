import { Component, NgZone } from '@angular/core';
import { HomepageService } from 'src/app/services/homepage/homepage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  protected newMails: number;

  constructor(
    private homepageService: HomepageService,
    private zone: NgZone
  ) {
    this.newMails = this.homepageService.checkNewMailsValue();
    this.homepageService.newMailsChange.subscribe((mailsValue) => {
      this.zone.run(() => { // NgZone allows Angular to detect the change
        this.newMails = mailsValue;
      });
    });
  }

  ionViewWillLeave() {
    this.homepageService.newMailsChange.unsubscribe();
  }

}
