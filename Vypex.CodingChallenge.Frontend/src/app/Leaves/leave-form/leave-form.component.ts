import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Employee } from '../../employees/models/employee';
import { LeaveDay } from '../../employees/models/leaveDay';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrl: './leave-form.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LeaveFormComponent),
      multi: true
    }
  ],
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
export class LeaveFormComponent implements ControlValueAccessor, OnInit {

  private readonly fb = inject(FormBuilder);

  onChange = (value: any) => { };
  onTouched = () => { };


  @Input() employee: Employee = new Employee();
  @Input() leaveDay: LeaveDay = new LeaveDay();
  @Input() leaveForm!: FormGroup;

  ngOnInit(): void {
    this.leaveForm.valueChanges.subscribe(value => {
      this.onChange(value);
    });
  }

  writeValue(value: any): void {
    if (value) {
      this.leaveForm.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.leaveForm.disable();
    } else {
      this.leaveForm.enable();
    }
  }
}
