import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfectedPage } from './infected.page';

describe('InfectedPage', () => {
  let component: InfectedPage;
  let fixture: ComponentFixture<InfectedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfectedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfectedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
