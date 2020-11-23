import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilterSubscriptionsPopoverComponent } from './filter-subscriptions-popover.component';

describe('FilterSubscriptionsPopoverComponent', () => {
  let component: FilterSubscriptionsPopoverComponent;
  let fixture: ComponentFixture<FilterSubscriptionsPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSubscriptionsPopoverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterSubscriptionsPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
