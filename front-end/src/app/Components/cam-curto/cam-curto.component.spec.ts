import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamCurtoComponent } from './cam-curto.component';

describe('CamCurtoComponent', () => {
  let component: CamCurtoComponent;
  let fixture: ComponentFixture<CamCurtoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CamCurtoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CamCurtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
