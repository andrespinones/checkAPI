import { AbstractControl } from '@angular/forms';

export function ValidateUrl(control: AbstractControl) {
  if (!control.value.startsWith('http') ) {
    return { invalidUrl: true };
  }
  return null;
}
