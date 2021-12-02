import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeNivelComponent } from './rede-nivel.component';

describe('RedeNivelComponent', () => {
  let component: RedeNivelComponent;
  let fixture: ComponentFixture<RedeNivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedeNivelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
