import { TestBed } from '@angular/core/testing';

import { SugerirGruposService } from './sugerir-grupos.service';

describe('SugerirGruposService', () => {
  let service: SugerirGruposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SugerirGruposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
