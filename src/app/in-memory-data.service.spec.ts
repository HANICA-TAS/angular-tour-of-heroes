import {TestBed} from '@angular/core/testing';

import {InMemoryDataService} from './in-memory-data.service';

describe('InMemoryDataService', () => {
  let service: InMemoryDataService;

  beforeEach(() => {
    service = TestBed.get(InMemoryDataService);
  });

  it('should be created with 10 heroes', () => {
    const heroes = service.createDb();
    expect(heroes.heroes.length).toBe(10);
  });

  it('generates 11 when there are no heroes', () => {
    expect(service.genId([])).toBe(11);
  });

  it('generates one plus max hero when there are enough heroes', () => {
    expect(service.genId([{ id: 20, name: 'Tornado' }])).toBe(21);
  });
});
