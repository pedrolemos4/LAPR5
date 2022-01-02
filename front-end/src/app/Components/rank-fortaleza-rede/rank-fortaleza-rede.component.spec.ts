import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankFortalezaRedeComponent } from './rank-fortaleza-rede.component';

describe('RankFortalezaRedeComponent', () => {
  let component: RankFortalezaRedeComponent;
  let fixture: ComponentFixture<RankFortalezaRedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankFortalezaRedeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankFortalezaRedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
