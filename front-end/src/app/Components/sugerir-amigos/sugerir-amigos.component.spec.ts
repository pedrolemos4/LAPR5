import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugerirAmigosComponent } from './sugerir-amigos.component';

describe('SugerirAmigosComponent', () => {
  let component: SugerirAmigosComponent;
  let fixture: ComponentFixture<SugerirAmigosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SugerirAmigosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SugerirAmigosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
