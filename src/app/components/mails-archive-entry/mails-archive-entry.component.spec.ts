import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MailsArchiveEntryComponent } from './mails-archive-entry.component';

describe('MailsArchiveEntryComponent', () => {
  let component: MailsArchiveEntryComponent;
  let fixture: ComponentFixture<MailsArchiveEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailsArchiveEntryComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MailsArchiveEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
