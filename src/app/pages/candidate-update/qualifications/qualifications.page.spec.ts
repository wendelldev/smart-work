import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QualificationsPage } from './qualifications.page';

describe('QualificationsPage', () => {
  let component: QualificationsPage;
  let fixture: ComponentFixture<QualificationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualificationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QualificationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
