import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAlgoritmosComponent } from './ver-algoritmos.component';

describe('VerAlgoritmosComponent', () => {
  let component: VerAlgoritmosComponent;
  let fixture: ComponentFixture<VerAlgoritmosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerAlgoritmosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAlgoritmosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
