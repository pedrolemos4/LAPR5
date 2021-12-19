import { TestBed } from '@angular/core/testing';

import { AmigosComumService } from './amigos-comum.service';

describe('AmigosComumService', () => {
  let service: AmigosComumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmigosComumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
