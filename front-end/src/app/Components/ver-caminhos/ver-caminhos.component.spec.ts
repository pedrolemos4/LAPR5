import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCaminhosComponent } from './ver-caminhos.component';

describe('VerCaminhosComponent', () => {
  let component: VerCaminhosComponent;
  let fixture: ComponentFixture<VerCaminhosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerCaminhosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerCaminhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
