import { TestBed } from '@angular/core/testing';

import { LeadsService } from './leads.service';

describe('LeadsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeadsService = TestBed.get(LeadsService);
    expect(service).toBeTruthy();
  });
});
