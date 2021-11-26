import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamSeguroComponent } from './cam-seguro.component';

describe('CamSeguroComponent', () => {
  let component: CamSeguroComponent;
  let fixture: ComponentFixture<CamSeguroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CamSeguroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CamSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
