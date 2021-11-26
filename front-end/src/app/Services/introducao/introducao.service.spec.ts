import { TestBed } from '@angular/core/testing';

import { IntroducaoService } from './introducao.service';

describe('IntroducaoService', () => {
  let service: IntroducaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntroducaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
