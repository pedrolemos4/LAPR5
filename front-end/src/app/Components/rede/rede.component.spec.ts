import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RedeComponent } from './rede.component';

describe('RedeComponent', () => {
  let component: RedeComponent;
  let fixture: ComponentFixture<RedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedeComponent ],
      providers: [FormBuilder],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
