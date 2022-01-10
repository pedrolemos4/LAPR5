import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DfsLigacaoRelacaoComponent } from './dfs-ligacao-relacao.component';

describe('DfsLigacaoRelacaoComponent', () => {
  let component: DfsLigacaoRelacaoComponent;
  let fixture: ComponentFixture<DfsLigacaoRelacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DfsLigacaoRelacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DfsLigacaoRelacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
