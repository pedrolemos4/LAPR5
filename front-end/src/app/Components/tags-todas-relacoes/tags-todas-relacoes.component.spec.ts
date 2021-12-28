import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsTodasRelacoesComponent } from './tags-todas-relacoes.component';

describe('TagsTodasRelacoesComponent', () => {
  let component: TagsTodasRelacoesComponent;
  let fixture: ComponentFixture<TagsTodasRelacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsTodasRelacoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsTodasRelacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
