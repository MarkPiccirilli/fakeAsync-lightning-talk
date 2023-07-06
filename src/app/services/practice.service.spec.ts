import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { PracticeService } from './practice.service';

describe('PracticeService', () => {
  let service: PracticeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the correct string from the service', fakeAsync(() => {
    tick(2000);
    service.practiceServiceCall().subscribe((response) => {
      expect(response).toEqual({ data: 'Leo is my favorite cat!!!' })
    });
    flush();
  }));
});
