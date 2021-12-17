import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsTodosJogadoresComponent } from './tags-todos-jogadores.component';

describe('TagsTodosJogadoresComponent', () => {
  let component: TagsTodosJogadoresComponent;
  let fixture: ComponentFixture<TagsTodosJogadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsTodosJogadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsTodosJogadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
