import { TestBed } from '@angular/core/testing';

import { TagsTodasRelacoesService } from './tags-todas-relacoes.service';

describe('TagsTodasRelacoesService', () => {
  let service: TagsTodasRelacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagsTodasRelacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
