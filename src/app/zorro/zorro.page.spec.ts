import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ZorroPage } from './zorro.page';

describe('ZorroPage', () => {
  let component: ZorroPage;
  let fixture: ComponentFixture<ZorroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZorroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ZorroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
