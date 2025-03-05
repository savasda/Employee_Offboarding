import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Employee } from '@models/employee';
import { Store } from '@ngrx/store';
import { offboardEmployee } from '@store/employees-store/employees.actions';
import { PhoneValidator } from '@validators/phone.validator';

@Component({
  selector: 'app-offboard-dialog',
  templateUrl: './offboard-dialog.component.html',
  styleUrls: ['./offboard-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatInputModule,
    MatError
  ]
})
export class OffboardDialogComponent {
  readonly dialogRef = inject(MatDialogRef<OffboardDialogComponent>);
  readonly fb = inject(FormBuilder);
  readonly store = inject(Store);
  offboardForm = this.fb.group({
    receiver: this.fb.control(null, [Validators.required]),
    email: this.fb.control(null, [Validators.email, Validators.required]),
    phone: this.fb.control(null, [Validators.required, PhoneValidator.validPhoneNumber]),
    street: this.fb.control(null, [Validators.required]),
    city: this.fb.control(null, [Validators.required]),
    postalCode: this.fb.control(null, [Validators.required]),
    country: this.fb.control(null, [Validators.required]),
    notes: this.fb.control(null)
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: Employee) {}

  onOffboardUser(): void {
    this.offboardForm.markAllAsTouched();
    if (this.offboardForm.valid) {
      this.store.dispatch(offboardEmployee({ employee: this.data }));
      this.dialogRef.close(true);
    }
  }
}
