import { TestBed } from '@angular/core/testing';

import { SuscriptorService } from './suscriptor.service';

describe('SuscriptorService', () => {
  let service: SuscriptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuscriptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
