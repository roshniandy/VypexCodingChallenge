import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LeaveApiService } from './leave-api.service';

describe('LeaveApiService', () => {
  let service: LeaveApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LeaveApiService]
    });

    service = TestBed.inject(LeaveApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return an array of leaves', () => {
    let empid = '15A1A3ED-B5AD-469D-4443-08DD8BA07036c';
    service.getEmployeeLeaves(empid).subscribe((employees) => {
      expect(employees.length).toBeGreaterThan(0);
      expect(employees).toBeTruthy
    });

    let baseUrl = 'https://localhost:7189/api/';
    const req = httpMock.expectOne(`${baseUrl}leave/emp-leaves/${empid}`);
    expect(req.request.method).toBe('GET');
  });

  it('should delete a leave by ID', () => {
    let leaveId = '15A1A3ED-B5AD-469D-4443-08DD8BA07036c';

    service.deleteLeaves(leaveId).subscribe(response => {
      expect(response).toBeNull();
    });

    let baseUrl = 'https://localhost:7189/api/';
    const req = httpMock.expectOne(`${baseUrl}leave/${leaveId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should delete a leave by ID', () => {
    let leaveId = '15A1A3ED-B5AD-469D-4443-08DD8BA07036c';

    service.deleteLeaves(leaveId).subscribe(response => {
      expect(response).toBeNull();
    });

    let baseUrl = 'https://localhost:7189/api/';
    const req = httpMock.expectOne(`${baseUrl}leave/${leaveId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should add a new leave', () => {
    const leaveDay = { id: "32312", reason: "fewwe", startDate: new Date(), endDate: new Date(), employeeId: "213123412" }

    service.addLeaves(leaveDay).subscribe(response => {
      expect(response).toBeNull();
    });

    let baseUrl = 'https://localhost:7189/api/';
    const req = httpMock.expectOne(`${baseUrl}leave`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(leaveDay);
    req.flush(null);
  });

  it('should update a new leave', () => {
    const leaveDay = { id: "32312", reason: "fewwe", startDate: new Date(), endDate: new Date(), employeeId: "213123412" }

    service.updateLeaves(leaveDay).subscribe(response => {
      expect(response).toBeNull();
    });

    let baseUrl = 'https://localhost:7189/api/';
    const req = httpMock.expectOne(`${baseUrl}leave`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(leaveDay);
    req.flush(null);
  });
});
