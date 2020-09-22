import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CandidateUpdatePage } from './candidate-update.page';

describe('CandidateUpdatePage', () => {
  let component: CandidateUpdatePage;
  let fixture: ComponentFixture<CandidateUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateUpdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CandidateUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
