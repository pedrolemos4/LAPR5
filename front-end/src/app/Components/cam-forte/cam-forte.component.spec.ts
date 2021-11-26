import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamForteComponent } from './cam-forte.component';

describe('CamForteComponent', () => {
  let component: CamForteComponent;
  let fixture: ComponentFixture<CamForteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CamForteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CamForteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
