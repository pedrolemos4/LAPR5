import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RelacaoComponent } from './relacao.component';

describe('RelacaoComponent', () => {
  let component: RelacaoComponent;
  let fixture: ComponentFixture<RelacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelacaoComponent ],
      providers: [FormBuilder],
      imports: [HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
