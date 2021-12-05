import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';

import { CamCurtoComponent } from './cam-curto.component';

describe('CamCurtoComponent', () => {
  let component: CamCurtoComponent;
  let fixture: ComponentFixture<CamCurtoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CamCurtoComponent ],
      providers: [FormBuilder],
      imports: [HttpClientTestingModule]
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
