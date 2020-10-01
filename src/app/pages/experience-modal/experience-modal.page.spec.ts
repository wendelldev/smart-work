import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExperienceModalPage } from './experience-modal.page';

describe('ExperienceModalPage', () => {
  let component: ExperienceModalPage;
  let fixture: ComponentFixture<ExperienceModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
