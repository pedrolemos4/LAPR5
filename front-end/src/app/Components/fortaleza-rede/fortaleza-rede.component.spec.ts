import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FortalezaRedeComponent } from './fortaleza-rede.component';

describe('FortalezaRedeComponent', () => {
  let component: FortalezaRedeComponent;
  let fixture: ComponentFixture<FortalezaRedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FortalezaRedeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FortalezaRedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
