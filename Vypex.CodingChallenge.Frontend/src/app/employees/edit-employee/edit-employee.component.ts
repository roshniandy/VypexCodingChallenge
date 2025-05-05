import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { EditEmployeeBindings, EditEmployeeResult } from './edit-employee.modal';
import { DateDiffPipe } from '../../common/dateDiff.pipe';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LeaveDay } from '../models/leaveDay';
import { Employee } from '../models';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Operation } from '../models/operation.enum';
import { LeaveFormComponent } from '../../Leaves/leave-form/leave-form.component';
import { Observable } from 'rxjs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LeaveApiService } from '../services/leave-api.service';

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
  private readonly leaveApiService = inject(LeaveApiService);
  private readonly modalRef = inject(NzModalRef<EditEmployeeComponent, EditEmployeeResult>);
  private readonly modalData = inject<EditEmployeeBindings>(NZ_MODAL_DATA);
  private readonly fb = inject(FormBuilder);
  public message = inject(NzMessageService);


  public employee: Employee = this.modalData.selectedEmployee;
  public editOp: Operation = Operation.edit;
  public createOp: Operation = Operation.create;
  public leaveDay: LeaveDay = new LeaveDay();
  public applyLeaveForm: boolean = false;
  public editLeaveForm: boolean = false;


  public employeesLeaves$: Observable<Array<LeaveDay>> = new Observable<Array<LeaveDay>>();;
  public updateLeaves = signal("Update leave signal");

  protected cancel(): void {
    this.modalRef.triggerCancel();
  }

  constructor() {
    effect(() => {
      console.log(`The update is: ${this.updateLeaves()}`);
      this.loadLeaves();
      this.applyLeaveForm = false;
      this.editLeaveForm = false;
    });
  }

  protected loadLeaves() {

    this.employeesLeaves$ = this.leaveApiService.getEmployeeLeaves(this.employee.id);
  }

  protected delete(leaveId: string): void {
    this.leaveApiService.deleteLeaves(leaveId).subscribe({
      next: () => {
        this.message.success('Leave deleted');
        this.updateLeaves.set(`Deleted ${leaveId}`);
      },
      error: () => { this.message.error('Failed to delete leave') }
    });
  }

  protected edit(leave: LeaveDay): void {
    this.leaveDay = leave;
    this.editLeaveForm = true;
  }

  protected applyleave(employee: Employee): void {
    this.applyLeaveForm = true;
  }
}
