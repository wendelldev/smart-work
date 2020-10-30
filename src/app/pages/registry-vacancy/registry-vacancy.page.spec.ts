import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistryVacancyPage } from './registry-vacancy.page';

describe('RegistryVacancyPage', () => {
  let component: RegistryVacancyPage;
  let fixture: ComponentFixture<RegistryVacancyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistryVacancyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistryVacancyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
