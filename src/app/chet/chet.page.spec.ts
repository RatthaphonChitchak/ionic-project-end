import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChetPage } from './chet.page';

describe('ChetPage', () => {
  let component: ChetPage;
  let fixture: ComponentFixture<ChetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
