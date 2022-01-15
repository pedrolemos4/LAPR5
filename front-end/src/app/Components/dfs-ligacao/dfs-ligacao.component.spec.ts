import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DfsLigacaoComponent } from './dfs-ligacao.component';

describe('DfsLigacaoComponent', () => {
  let component: DfsLigacaoComponent;
  let fixture: ComponentFixture<DfsLigacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DfsLigacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DfsLigacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
