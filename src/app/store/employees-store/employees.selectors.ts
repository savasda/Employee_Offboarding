import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EMPLOYEES_FEATURE_NAME, EmployeesState } from './employees.reducer';
const selectEmployeeState = createFeatureSelector<EmployeesState>(EMPLOYEES_FEATURE_NAME);
export const selectEmployees = createSelector(selectEmployeeState, state => state.employees);
export const selectEmployeeById = (id: string) =>
  createSelector(selectEmployeeState, state => state.employees.find(emp => emp.id === id));
