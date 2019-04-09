import { TestBed, inject } from '@angular/core/testing';

import { DataPersistenceService } from './data-persistence.service';

describe('DataPersistenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataPersistenceService]
    });
  });

  it('should be created', inject([DataPersistenceService], (service: DataPersistenceService) => {
    expect(service).toBeTruthy();
  }));
});
