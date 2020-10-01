import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScholarityPage } from './scholarity.page';

describe('ScholarityPage', () => {
  let component: ScholarityPage;
  let fixture: ComponentFixture<ScholarityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScholarityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScholarityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
