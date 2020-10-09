import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContractorProfilePage } from './contractor-profile.page';

describe('ContractorProfilePage', () => {
  let component: ContractorProfilePage;
  let fixture: ComponentFixture<ContractorProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContractorProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
