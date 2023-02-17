import { TestBed } from '@angular/core/testing';

import { AbidiShopFormService } from './abidi-shop-form.service';

describe('AbidiShopFormService', () => {
  let service: AbidiShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbidiShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
