import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RedeNivelComponent } from './rede-nivel.component';

describe('RedeNivelComponent', () => {
  let component: RedeNivelComponent;
  let fixture: ComponentFixture<RedeNivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedeNivelComponent ],
      providers: [FormBuilder],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
