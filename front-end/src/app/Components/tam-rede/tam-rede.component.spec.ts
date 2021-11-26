import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TamRedeComponent } from './tam-rede.component';

describe('TamRedeComponent', () => {
  let component: TamRedeComponent;
  let fixture: ComponentFixture<TamRedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TamRedeComponent ]
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
