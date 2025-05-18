import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { BehaviorSubject } from 'rxjs';
import { DateDiffPipe } from '../../common/dateDiff.pipe';
import { validateForm } from '../../common/validateForm';
import { LeaveFormComponent } from '../../Leaves/leave-form/leave-form.component';
import { Employee } from '../models/employee';
import { LeaveDay } from '../models/leaveDay';
import { EmployeeApiService } from '../services/employee-api.service';
import { LeaveApiService } from '../services/leave-api.service';
import { EditEmployeeBindings, EditEmployeeResult } from './edit-employee.modal';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    DateDiffPipe,
    NzTableModule,
    LeaveFormComponent,
    NzIconModule
  ]
})
export class EditEmployeeComponent {
  private readonly modalRef = inject(NzModalRef<EditEmployeeComponent, EditEmployeeResult>);
  private readonly modalData = inject<EditEmployeeBindings>(NZ_MODAL_DATA);
  private readonly fb = inject(FormBuilder);

  public employee = this.modalData.selectedEmployee;
  public applyLeaveForm: boolean = false;
  public editLeaveForm: boolean = false;
  public leaveDay: LeaveDay = new LeaveDay();

  public message = inject(NzMessageService);

  private readonly leaveApiService = inject(LeaveApiService);
  private readonly empApiService = inject(EmployeeApiService);

  private employeeLeavesSubject = new BehaviorSubject<LeaveDay[]>([]);
  public employeesLeaves$ = this.employeeLeavesSubject.asObservable();


  protected readonly form = this.fb.group({
    name: this.fb.nonNullable.control(this.employee.name, Validators.required),
    id: this.fb.nonNullable.control(this.employee.id, Validators.required),
    leaveForm: this.fb.group({
      startDate: this.fb.nonNullable.control(this.leaveDay.startDate, Validators.required),
      endDate: this.fb.nonNullable.control(this.leaveDay.endDate, Validators.required),
      reason: this.fb.nonNullable.control(this.leaveDay.reason),
    })
  });

  constructor() {
    effect(() => {
      this.loadLeaves();
      this.applyLeaveForm = false;
      this.editLeaveForm = false;
    });
  }

  protected loadLeaves() {
    this.leaveApiService.getEmployeeLeaves(this.employee.id).subscribe(
      (data) => {
        this.employeeLeavesSubject.next(data);
      })
  }


  protected cancel(): void {
    this.modalRef.triggerCancel();
  }

  protected submit(): void {
    if (!validateForm(this.form)) return;

    const raw = this.form.value;

    if (this.modalData.selectedEmployee.name != raw.name && raw.name) {
      const empPayload = {
        id: raw.id,
        name: raw.name
      };


      this.empApiService.updateEmployee(empPayload).subscribe({
        next: () => {
          this.message.success('Employee name updated successfully!');
        },
        error: (err) => {
          this.message.error('Failed to update employee name');
        }
      });

    }

    if (this.form.get('leaveForm')?.dirty) {
      const payload = {
        employeeId: raw.id,
        startDate: raw.leaveForm?.startDate,
        endDate: raw.leaveForm?.endDate,
        reason: raw.leaveForm?.reason
      };


      if (this.applyLeaveForm) {
        this.leaveApiService.addLeaves(payload).subscribe({
          next: () => {
            this.message.success('Leave created successfully!');
          },
          error: (err) => {
            this.message.error('Failed to submit leave');
          }
        });
      }
      else if (this.editLeaveForm) {
        this.leaveApiService.updateLeaves(payload).subscribe({
          next: () => {
            this.message.success('Leave updated successfully!');
          },
          error: (err) => {
            this.message.error('Failed to update leave');
          }
        });
      }

      setTimeout(() => {
        this.loadLeaves();
      }, 10);
    }
  }

  protected applyleave(employee: Employee): void {
    this.applyLeaveForm = true;
    this.editLeaveForm = false;
    this.leaveDay = new LeaveDay();
    this.form.patchValue({
      leaveForm: this.leaveDay
    });
  }

  protected delete(leaveId: string): void {
    this.leaveApiService.deleteLeaves(leaveId).subscribe({
      next: () => {
        this.message.success('Leave deleted');
        setTimeout(() => {
          this.loadLeaves();
        }, 10);
      },
      error: () => { this.message.error('Failed to delete leave') }
    });
  }

  protected edit(leave: LeaveDay): void {
    this.editLeaveForm = true;
    this.applyLeaveForm = false;

    this.leaveDay = leave;

    this.form.patchValue({
      leaveForm: leave
    });
  }
}
