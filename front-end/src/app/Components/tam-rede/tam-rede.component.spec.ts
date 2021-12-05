import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';

import { TamRedeComponent } from './tam-rede.component';

describe('TamRedeComponent', () => {
  let component: TamRedeComponent;
  let fixture: ComponentFixture<TamRedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TamRedeComponent ],
      providers: [FormBuilder],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TamRedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
