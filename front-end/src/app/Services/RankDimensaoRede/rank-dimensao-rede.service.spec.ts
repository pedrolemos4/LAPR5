import { TestBed } from '@angular/core/testing';

import { RankDimensaoRedeService } from './rank-dimensao-rede.service';

describe('RankDimensaoRedeService', () => {
  let service: RankDimensaoRedeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RankDimensaoRedeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
