import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JourneyPage } from './journey.page';

describe('JourneyPage', () => {
  let component: JourneyPage;
  let fixture: ComponentFixture<JourneyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JourneyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JourneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
