import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LeaveApiService } from '../../employees/services/leave-api.service';
import { LeaveFormComponent } from './leave-form.component';

describe('LeaveFormComponent (standalone)', () => {
  let component: LeaveFormComponent;
  let fixture: ComponentFixture<LeaveFormComponent>;
  let leaveApiService: LeaveApiService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule,
        ReactiveFormsModule,
        NzFormModule,
        NzButtonModule,
        NzInputModule,
        NzDatePickerModule,
        HttpClientModule
      ],
      providers: [LeaveApiService]
    }).compileComponents();

    fixture = TestBed.createComponent(LeaveFormComponent);
    component = fixture.componentInstance;
    leaveApiService = TestBed.inject(LeaveApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
