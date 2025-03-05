import { Employee } from '@models/employee';
import { Action, createReducer, on } from '@ngrx/store';

import * as EmployeeActions from './employees.actions';

export const EMPLOYEES_FEATURE_NAME = 'employees';

export interface EmployeesState {
  employees: Employee[];
}

export const initialState: EmployeesState = {
  employees: []
};

const innerEmployeeReducer = createReducer(
  initialState,
  on(EmployeeActions.loadEmployeesSuccess, (state, { employees }) => ({
    ...state,
    employees
  })),
  on(EmployeeActions.offboardEmployeeSuccess, (state, { employee }) => {
    const filtered = state.employees.filter(el => el.id !== employee.id);
    return {
      ...state,
      employees: [...filtered, employee]
    };
  })
);

export const employeesReducer = (state: EmployeesState, action: Action): EmployeesState =>
  innerEmployeeReducer(state, action);
