import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../common/services/http.service';
import { LeaveDay } from '../models/leaveDay';

@Injectable({ providedIn: 'root' })
export class LeaveApiService {

  private readonly httpClient = inject(HttpService);

  public addLeaves(leaveDay: any): Observable<void> {
    return this.httpClient.post<void>('leave', leaveDay);
  }

  public updateLeaves(leaveDay: any): Observable<void> {
    return this.httpClient.put<void>('leave', leaveDay);
  }

  public deleteLeaves(leaveId: string): Observable<void> {
    return this.httpClient.delete<void>(`leave/${leaveId}`);
  }

  public getEmployeeLeaves(employeeId: string): Observable<Array<LeaveDay>> {
    return this.httpClient.get<Array<LeaveDay>>(`leave/emp-leaves/${employeeId}`);
  }
}
