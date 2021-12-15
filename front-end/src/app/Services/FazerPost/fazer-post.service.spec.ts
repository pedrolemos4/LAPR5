import { TestBed } from '@angular/core/testing';

import { FazerPostService } from './fazer-post.service';

describe('FazerPostService', () => {
  let service: FazerPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FazerPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
