import { TestBed } from '@angular/core/testing';

import { TagCloudPessoalService } from './tag-cloud-pessoal.service';

describe('TagCloudPessoalService', () => {
  let service: TagCloudPessoalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagCloudPessoalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
