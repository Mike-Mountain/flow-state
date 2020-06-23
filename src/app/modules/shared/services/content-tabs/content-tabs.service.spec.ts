import { TestBed } from '@angular/core/testing';

import { ContentTabsService } from './content-tabs.service';

describe('ContentTabsService', () => {
  let service: ContentTabsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentTabsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
