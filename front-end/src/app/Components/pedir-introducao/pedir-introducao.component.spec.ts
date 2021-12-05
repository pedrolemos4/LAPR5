import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PedirIntroducaoComponent } from './pedir-introducao.component';

describe('PedirIntroducaoComponent', () => {
  let component: PedirIntroducaoComponent;
  let fixture: ComponentFixture<PedirIntroducaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedirIntroducaoComponent ],
      providers: [FormBuilder],
      imports: [HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedirIntroducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
