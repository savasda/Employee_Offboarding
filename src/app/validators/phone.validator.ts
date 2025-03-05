import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PhoneValidator {
  static validPhoneNumber(control: AbstractControl): ValidationErrors | null {
    const phoneRegex = /^\+\d{1,3}\d{6,12}$/;
    if (!control.value) {
      return null;
    }

    return phoneRegex.test(control.value) ? null : { invalidPhone: true };
  }
}
