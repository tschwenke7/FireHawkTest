/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FormResponsesService } from './form-responses.service';

describe('Service: FormResponsesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormResponsesService]
    });
  });

  it('should ...', inject([FormResponsesService], (service: FormResponsesService) => {
    expect(service).toBeTruthy();
  }));
});
