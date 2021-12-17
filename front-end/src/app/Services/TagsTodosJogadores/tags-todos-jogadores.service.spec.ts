import { TestBed } from '@angular/core/testing';

import { TagsTodosJogadoresService } from './tags-todos-jogadores.service';

describe('TagsTodosJogadoresService', () => {
  let service: TagsTodosJogadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagsTodosJogadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
