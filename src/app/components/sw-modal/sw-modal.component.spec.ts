import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SwModalComponent } from './sw-modal.component';

describe('SwModalComponent', () => {
  let component: SwModalComponent;
  let fixture: ComponentFixture<SwModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SwModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
