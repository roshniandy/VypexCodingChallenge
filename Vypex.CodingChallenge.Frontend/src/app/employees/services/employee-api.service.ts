import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Employee } from '../models/employee';
import { HttpService } from '../../common/services/http.service';

@Injectable({ providedIn: 'root' })
export class EmployeeApiService {
  private readonly httpClient = inject(HttpService);

  public getEmployees(): Observable<Array<Employee>> {
    return this.httpClient.get<Array<Employee>>('employee');
  }

}
