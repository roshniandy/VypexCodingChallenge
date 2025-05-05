import { AsyncPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { EditEmployeeModal } from '../edit-employee/edit-employee.modal';
import { EmployeeApiService } from '../services/employee-api.service';
import { EmployeesComponent } from './employees.component';

describe('LeaveFormComponent (standalone)', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;
  let employeeApiService: EmployeeApiService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesComponent,
        NzTableModule,
        NzButtonComponent,
        AsyncPipe,
        NzInputModule,
        NzIconModule,
        HttpClientModule,
        NzModalModule
      ],
      providers: [EmployeeApiService, EditEmployeeModal]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    employeeApiService = TestBed.inject(EmployeeApiService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
