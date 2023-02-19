import { TestBed } from '@angular/core/testing';

import { ImoAchatResolveService } from './imo-achat-resolve.service';

describe('ImoAchatResolveService', () => {
  let service: ImoAchatResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImoAchatResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
