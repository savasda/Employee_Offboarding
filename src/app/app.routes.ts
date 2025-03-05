import { Routes } from '@angular/router';
import { MainComponent } from '@pages/main/main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'employees',
        pathMatch: 'full'
      },
      {
        path: 'employees',
        loadComponent: () =>
          import('@pages/employees/employees.component').then(component => component.EmployeesComponent)
      },
      {
        path: 'employees/:id',
        loadComponent: () =>
          import('@pages/employee-details/employee-details.component').then(
            component => component.EmployeeDetailsComponent
          )
      }
    ]
  }
];
