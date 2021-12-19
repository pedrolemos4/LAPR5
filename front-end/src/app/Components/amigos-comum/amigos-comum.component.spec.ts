import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmigosComumComponent } from './amigos-comum.component';

describe('AmigosComumComponent', () => {
  let component: AmigosComumComponent;
  let fixture: ComponentFixture<AmigosComumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmigosComumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmigosComumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
