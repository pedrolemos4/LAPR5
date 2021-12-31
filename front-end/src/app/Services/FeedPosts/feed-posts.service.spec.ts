import { TestBed } from '@angular/core/testing';

import { FeedPostsService } from './feed-posts.service';

describe('FeedPostsService', () => {
  let service: FeedPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
