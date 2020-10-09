import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResumesPage } from './resumes.page';

describe('ResumesPage', () => {
  let component: ResumesPage;
  let fixture: ComponentFixture<ResumesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResumesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
