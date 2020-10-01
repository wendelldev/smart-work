import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvatarProfilePage } from './avatar-profile.page';

describe('AvatarProfilePage', () => {
  let component: AvatarProfilePage;
  let fixture: ComponentFixture<AvatarProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
