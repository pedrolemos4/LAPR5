import { TestBed } from '@angular/core/testing';

import { RankFortalezaRedeService } from './rank-fortaleza-rede.service';

describe('RankFortalezaRedeService', () => {
  let service: RankFortalezaRedeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RankFortalezaRedeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
