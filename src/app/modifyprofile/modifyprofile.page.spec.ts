import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifyprofilePage } from './modifyprofile.page';

describe('ModifyprofilePage', () => {
  let component: ModifyprofilePage;
  let fixture: ComponentFixture<ModifyprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
