/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { CircleService } from './circle.service';

describe('Service: Circle', () => {
  beforeEach(() => {
    addProviders([CircleService]);
  });

  it('should ...',
    inject([CircleService],
      (service: CircleService) => {
        expect(service).toBeTruthy();
      }));
});
