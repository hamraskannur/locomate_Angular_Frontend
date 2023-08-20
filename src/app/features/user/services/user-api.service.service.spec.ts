import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserApiServiceService } from './user-api.service.service';

describe('UserApiServiceService', () => {
  let service: UserApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Correctly imported module
      providers: [UserApiServiceService],
    });
    service = TestBed.inject(UserApiServiceService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
