import { TestBed } from '@angular/core/testing';

import { LoginHandlerService } from './login-handler.service';

describe('LoginHandlerService', () => {
  let service: LoginHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
