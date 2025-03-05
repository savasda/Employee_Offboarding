import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleComponent } from '@components/title/title.component';
import { Employee } from '@models/employee';
import { Store } from '@ngrx/store';
import { EquipmentParserPipe } from '@pipes/equipment-parser.pipe';
import { HighlightPipe } from '@pipes/highlight.pipe';
import { EmployeeService } from '@services/employee.service';
import { selectEmployees } from '@store/employees-store/employees.selectors';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  imports: [
    TitleComponent,
    MatTabsModule,
    MatTableModule,
    EquipmentParserPipe,
    TitleCasePipe,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HighlightPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesComponent implements OnInit {
  readonly employeeService = inject(EmployeeService);
  readonly destroyRef = inject(DestroyRef);
  readonly router = inject(Router);
  readonly activatedRoute = inject(ActivatedRoute);
  readonly store = inject(Store);
  readonly pageName = 'Offboarding';
  searchControl = new FormControl<string>('');
  employees = signal<Employee[]>([]);
  filteredOutEmployees = signal<Employee[]>([]);
  displayedColumns: string[] = ['name', 'email', 'department', 'equipments', 'status'];

  ngOnInit() {
    this.store
      .select(selectEmployees)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(employees => {
        this.employees.set(employees);
        this.filteredOutEmployees.set(this.employees());
      });

    this.searchControl.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe(searchTerm => {
        if (searchTerm) {
          const filtered = this.employees().filter(
            el =>
              el.department.toLowerCase().includes(searchTerm.toLowerCase() ?? '') ||
              el.name.toLowerCase().includes(searchTerm.toLowerCase() ?? '')
          );
          this.filteredOutEmployees.set(filtered);
        } else {
          this.filteredOutEmployees.set(this.employees());
        }
      });
  }

  onEditEmployee(employee: Employee): void {
    this.router.navigate([employee.id], { relativeTo: this.activatedRoute });
  }
}
