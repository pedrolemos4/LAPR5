import { TestBed } from '@angular/core/testing';

import { TagRelacaoUserService } from './tag-relacao-user.service';

describe('TagRelacaoUserService', () => {
  let service: TagRelacaoUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagRelacaoUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
