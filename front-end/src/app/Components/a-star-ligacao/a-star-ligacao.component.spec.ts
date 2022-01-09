import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AStarLigacaoComponent } from './a-star-ligacao.component';

describe('AStarLigacaoComponent', () => {
  let component: AStarLigacaoComponent;
  let fixture: ComponentFixture<AStarLigacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AStarLigacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AStarLigacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
