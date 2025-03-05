import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { OffboardDialogComponent } from '@components/offboard-dialog/offboard-dialog.component';
import { SubtitleComponent } from '@components/subtitle/subtitle.component';
import { TitleComponent } from '@components/title/title.component';
import { ActionButton } from '@models/action-button';
import { Employee, EmployeeStatus } from '@models/employee';
import { EmployeeService } from '@services/employee.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitleComponent, SubtitleComponent, NgTemplateOutlet, MatTableModule, CommonModule]
})
export class EmployeeDetailsComponent implements OnInit {
  readonly activatedRoute = inject(ActivatedRoute);
  readonly employeeService = inject(EmployeeService);
  readonly destroyRef = inject(DestroyRef);
  readonly dialog = inject(MatDialog);
  readonly snackBar = inject(MatSnackBar);
  employee = signal<Employee | undefined>(undefined);
  displayedColumns: string[] = ['name'];
  disableButton = new BehaviorSubject(false);
  button: ActionButton = {
    buttonName: 'Offboard',
    disabled: this.disableButton.asObservable(),
    func: () => {
      this.offboardUser();
    }
  };

  ngOnInit() {
    const { id } = this.activatedRoute.snapshot.params;
    if (id) {
      this.employeeService
        .getEmployeeById(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(employee => {
          this.employee.set(employee);
          this.disableButton.next(employee.status === EmployeeStatus.OFFBOARDED);
        });
    }
  }

  offboardUser(): void {
    const dialog = this.dialog.open(OffboardDialogComponent, { data: this.employee() });
    dialog.afterClosed().subscribe(success => {
      if (success) {
        this.disableButton.next(true);
        this.snackBar.open(`${this.employee()?.name} Has been successfully offboarded.`, undefined, { duration: 3000 });
      }
    });
  }
}
