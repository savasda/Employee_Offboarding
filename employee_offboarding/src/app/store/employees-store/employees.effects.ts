import { inject, Injectable } from '@angular/core';
import { EmployeeStatus } from '@models/employee';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EmployeeService } from '@services/employee.service';
import { map, of, switchMap } from 'rxjs';

import * as EmployeesActions from './employees.actions';

@Injectable()
export class EmployeesStoreEffects {
  actions$ = inject(Actions);
  store$ = inject(Store);
  employeeService = inject(EmployeeService);

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.loadEmployees),
      switchMap(() =>
        this.employeeService.getEmployees().pipe(map(employees => EmployeesActions.loadEmployeesSuccess({ employees })))
      )
    )
  );

  offboardEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.offboardEmployee),
      switchMap(({ employee }) =>
        this.employeeService
          .offboardEmployee(employee)
          .pipe(
            switchMap(({ data }) =>
              of(
                EmployeesActions.offboardEmployeeSuccess({ employee: { ...data, status: EmployeeStatus.OFFBOARDED } }),
                EmployeesActions.loadEmployees()
              )
            )
          )
      )
    )
  );
}
