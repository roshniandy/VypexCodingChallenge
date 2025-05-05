import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { BehaviorSubject, combineLatest, map, Observable, startWith } from 'rxjs';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EditEmployeeModal } from '../edit-employee/edit-employee.modal';
import { Employee } from '../models/employee';
import { EmployeeApiService } from '../services/employee-api.service';

@Component({
  selector: 'app-employees',
  imports: [
    NzTableModule,
    NzButtonComponent,
    AsyncPipe,
    NzInputModule,
    NzIconModule,
  ],
  providers: [
    EditEmployeeModal
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
  private readonly employeeApiService = inject(EmployeeApiService);
  private readonly editEmployeeModal = inject(EditEmployeeModal);

  private search$ = new BehaviorSubject<string>('');
  public employees$!: Observable<Employee[]>;
  public filteredEmployees$!: Observable<Employee[]>;

  ngOnInit(): void {
    this.employees$ = this.employeeApiService.getEmployees();

    this.filteredEmployees$ = combineLatest([
      this.employees$,
      this.search$.pipe(startWith(''))
    ]).pipe(
      map(([employees, search]) =>
        employees.filter(emp =>
          emp.name.toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }

  public onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.search$.next(value);
  }

  public edit(employee: Employee) {
    this.editEmployeeModal.open({ selectedEmployee: employee })
      .afterClose
      .subscribe(result => {
        if (result === undefined) return;

      });
  }
}
