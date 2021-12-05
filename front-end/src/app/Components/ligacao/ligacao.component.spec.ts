import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LigacaoComponent } from './ligacao.component';

describe('LigacaoComponent', () => {
  let component: LigacaoComponent;
  let fixture: ComponentFixture<LigacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigacaoComponent ],
      providers: [FormBuilder],
      imports: [HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
