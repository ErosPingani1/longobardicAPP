import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MailboxPage } from './mailbox.page';

describe('MailboxPage', () => {
  let component: MailboxPage;
  let fixture: ComponentFixture<MailboxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailboxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MailboxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
