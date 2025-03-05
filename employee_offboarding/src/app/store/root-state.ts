import { provideEffects } from '@ngrx/effects';
import { ActionReducerMap, provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { EmployeesStoreEffects } from './employees-store/employees.effects';
import { EMPLOYEES_FEATURE_NAME, employeesReducer } from './employees-store/employees.reducer';

export const rootReducer: ActionReducerMap<any> = {};
export const storeProviders = [
  provideStore(rootReducer),
  provideState(EMPLOYEES_FEATURE_NAME, employeesReducer),
  provideStoreDevtools({ maxAge: 50, connectInZone: true }),
  provideEffects([EmployeesStoreEffects])
];
