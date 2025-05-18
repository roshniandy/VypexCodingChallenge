import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../common/services/http.service';
import { Employee } from '../models/employee';

@Injectable({ providedIn: 'root' })
export class EmployeeApiService {
  private readonly httpClient = inject(HttpService);

  public getEmployees(): Observable<Array<Employee>> {
    return this.httpClient.get<Array<Employee>>('employee');
  }

  public updateEmployee(employee: any): Observable<void> {
    return this.httpClient.put<void>('employee', employee);
  }

}
