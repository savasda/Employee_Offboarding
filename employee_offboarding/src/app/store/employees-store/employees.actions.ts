import { Employee } from '@models/employee';
import { createAction, props } from '@ngrx/store';
export const loadEmployees = createAction('[Employees] Load employees data Through API');
export const loadEmployeesSuccess = createAction(
  '[Employees] Load employees data Through API success',
  props<{ employees: Employee[] }>()
);
export const offboardEmployee = createAction(
  '[Employees] offboard employee Through API',
  props<{ employee: Employee }>()
);
export const offboardEmployeeSuccess = createAction(
  '[Employees] offboard employee success Through API',
  props<{ employee: Employee }>()
);
