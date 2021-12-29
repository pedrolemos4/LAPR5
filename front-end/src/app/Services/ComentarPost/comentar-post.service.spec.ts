import { TestBed } from '@angular/core/testing';

import { ComentarPostService } from './comentar-post.service';

describe('ComentarPostService', () => {
  let service: ComentarPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComentarPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
