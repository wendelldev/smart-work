import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CandidateProfilePage } from './candidate-profile.page';

describe('CandidateProfilePage', () => {
  let component: CandidateProfilePage;
  let fixture: ComponentFixture<CandidateProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CandidateProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
