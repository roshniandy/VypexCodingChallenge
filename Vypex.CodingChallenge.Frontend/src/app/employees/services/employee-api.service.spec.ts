import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeApiService } from './employee-api.service';
import { Employee } from '../models/employee';


describe('EmployeeService', () => {
  let service: EmployeeApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeApiService]
    });

    service = TestBed.inject(EmployeeApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should return an array of employees', () => {
    service.getEmployees().subscribe((employees) => {
      expect(employees.length).toBeGreaterThan(0);
      expect(employees).toBeTruthy
    });

    let baseUrl = 'https://localhost:7189/api';
    const req = httpMock.expectOne(`${baseUrl}/employee`);
    expect(req.request.method).toBe('GET');
  });
});
