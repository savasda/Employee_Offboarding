import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL_TOKEN } from '@app/config/tokens';
import { Employee } from '@models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private URL = inject(API_URL_TOKEN);
  private httpClient = inject(HttpClient);

  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.URL}/employees`);
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.URL}/employees/${id}`);
  }

  offboardEmployee(employee: Employee): Observable<{ message: string; data: Employee }> {
    return this.httpClient.post<{ message: string; data: Employee }>(
      `${this.URL}/users/${employee.id}/offboard`,
      employee
    );
  }
}
