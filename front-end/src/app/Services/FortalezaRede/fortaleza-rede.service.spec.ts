import { TestBed } from '@angular/core/testing';

import { FortalezaRedeService } from './fortaleza-rede.service';

describe('FortalezaRedeService', () => {
  let service: FortalezaRedeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FortalezaRedeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
