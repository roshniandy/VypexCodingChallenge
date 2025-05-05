import { CommonModule } from '@angular/common';
import { Component, inject, model, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { validateForm } from '../../common/validateForm';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LeaveDay } from '../../employees/models/leaveDay';
import { Employee } from '../../employees/models/employee';
import { Operation } from '../../employees/models/operation.enum';
import { LeaveApiService } from '../../employees/services/leave-api.service';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrl: './leave-form.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzDatePickerModule,

  ],
  standalone: true,
})
export class LeaveFormComponent implements OnChanges {
  private readonly leaveApiService = inject(LeaveApiService);

  private readonly fb = inject(FormBuilder);

  @Input() employee: Employee = new Employee();
  @Input() leaveDay: LeaveDay = new LeaveDay();
  @Input() operation: Operation = Operation.create;
  @Input() testval: string = '';
  updateLeaves = model("Update leave in Leave form");


  public message = inject(NzMessageService);
  leaveForm = this.fb.group({
    employeeId: this.fb.nonNullable.control(this.employee.id, Validators.required),
    name: this.fb.nonNullable.control(this.employee.name, Validators.required),
    startDate: this.fb.nonNullable.control(this.leaveDay.startDate, Validators.required),
    endDate: this.fb.nonNullable.control(this.leaveDay.endDate, Validators.required),
    reason: this.fb.nonNullable.control(this.leaveDay.reason),
  });

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngonchange =====")
    let they = this;
    if (changes['employee']?.currentValue) {
      this.leaveForm.patchValue({
        name: this.employee.name,
        employeeId: this.employee.id
      });
    }
    if (changes['operation']?.currentValue) {
      console.log("operation update" + this.operation)
      this.leaveForm.patchValue({
        name: this.employee.name,
        employeeId: this.employee.id,
        startDate: this.leaveDay.startDate,
        endDate: this.leaveDay.endDate,
        reason: this.leaveDay.reason
      });
    }
    if (changes['operation']?.currentValue) {
      this.leaveForm.patchValue({
        name: this.employee.name,
        employeeId: this.employee.id
      });
    }
    this.leaveForm.controls.name.disable();
  }

  protected submit(): void {
    console.log("leave for this op" + this.operation);

    if (!validateForm(this.leaveForm)) return;

    const formValue = this.leaveForm.getRawValue();
    if (this.operation == Operation.edit) {
      this.leaveApiService.updateLeaves(formValue).subscribe({
        next: () => {
          this.message.success('Leave  updated successfully');
          this.updateLeaves.set("Leave updated" + this.leaveDay.id);

        },
        error: () => this.message.error('Failed to submit leave')
      });
    }
    else {
      this.leaveApiService.addLeaves(formValue).subscribe({
        next: () => {
          this.message.success('Leave created successfully!');
          this.updateLeaves.set("Leave created" + this.employee.id);

        },
        error: () => this.message.error('Failed to submit leave')
      });

    }
  }
}
