import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (!control || !matchingControl) {
      return null;
    }

    if (matchingControl.errors && !matchingControl.errors['mismatch']) {
      return null;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      matchingControl.setErrors(null);
      return null;
    }
  };
}

export function alphabetValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = /^[a-zA-Z]*$/.test(control.value);
    return valid ? null : { alphabetOnly: true };
  };
}
export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Check if the control's value is a valid number (non-empty and consisting of digits only)
    const valid = /^\d*$/.test(control.value);
    return valid ? null : { numberOnly: true };
  };
}

export function futureDateValidator() {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the start of the day
    const selectedDate = new Date(control.value);
    return selectedDate.getTime() >= today.getTime() ? null : { invalidDate: true };
  };
}