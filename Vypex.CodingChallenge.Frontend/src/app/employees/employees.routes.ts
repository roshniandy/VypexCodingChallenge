import { Route, Routes } from "@angular/router";
import { EmployeesComponent } from "./list-employee/employees.component";

export const EMPLOYEES_ROUTES: Routes = [
  {
    path: '',
    component: EmployeesComponent
  }
];
