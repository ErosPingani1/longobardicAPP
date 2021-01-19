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
      this.zone.run(() => { // NgZone allows Angular to detect the change and show the new value on the html
        this.newMails = mailsValue;
      });
      console.log('Updated NewMails value: ', this.newMails);
    });
  }

  ionViewWillLeave() {
    this.homepageService.newMailsChange.unsubscribe();
  }

}
