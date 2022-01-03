import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankDimensaoRedeComponent } from './rank-dimensao-rede.component';

describe('RankDimensaoRedeComponent', () => {
  let component: RankDimensaoRedeComponent;
  let fixture: ComponentFixture<RankDimensaoRedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankDimensaoRedeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankDimensaoRedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
