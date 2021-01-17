import { Component } from '@angular/core';
import { HomepageService } from 'src/app/services/homepage/homepage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  protected newMails = 0;

  constructor(
    private homepageService: HomepageService
  ) {
    this.newMails = this.homepageService.checkNewMailsValue();
  }

}
