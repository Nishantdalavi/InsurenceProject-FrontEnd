import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validatePassword(control: AbstractControl): { [key: string]: any } | null {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(control.value)) {
        return { 'invalidPassword': true };
    }
    return null;
}

export function validateEmail(control: AbstractControl): { [key: string]: any } | null {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailPattern.test(control.value)) {
        return { 'invalidEmail': true };
    }
    return null;
}

export function validatePhone(control: AbstractControl): { [key: string]: any } | null {
    
    const phonePattern = /^[0-9]{10}$/; // Modify the pattern as needed
    if (!phonePattern.test(control.value)) {
        return { 'invalidPhone': true };
    }
    return null;
}
export function validateNonNegativeNumber(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (value !== null && value !== undefined && typeof value === 'number' && value < 0) {
        return { 'nonNegativeNumber': true };
    }
    return null;
}
export function validateDOB(control: AbstractControl): { [key: string]: any } | null {
    if (!control.value) {
        return null; // If DOB is not provided, don't perform validation
    }

    // Assuming the date is in a valid format (you might want to add more validation for the date format)
    const inputDate = new Date(control.value);

    // Calculate the minimum allowed date (e.g., 18 years ago)
    const minDOB = new Date();
    minDOB.setFullYear(minDOB.getFullYear() - 18);

    // Check if the input date is more recent than the minimum allowed date
    if (inputDate > minDOB) {
        return { 'invalidDOB': true };
    }

    return null;
}
export function validateDateOfComplaint(control: AbstractControl): { [key: string]: any } | null {
    if (!control.value) {
        return null; // If dateOfComplaint is not provided, don't perform validation
    }

    // Assuming the date is in a valid format (you might want to add more validation for the date format)
    const inputDate = new Date(control.value);

    // Get the current date
    const currentDate = new Date();

    // Define your maximum allowed date for complaints (e.g., today's date)
    if (inputDate > currentDate) {
        return { 'invalidDateOfComplaint': true };
    }

    return null;
    
}
export function validateMinMax(control: AbstractControl): { [key: string]: any } | null {
    debugger
    const min = control.get('minAmount')?.value;
    const max = control.get('maxAmount')?.value;
  
    if (min !== null && max !== null && min >= max) {
      return { 'minMaxError': true };
    }
  
    return null;
  }

  

  export function validateMinLessThanMax(minControlName: string, maxControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const minControl = formGroup.get(minControlName);
      const maxControl = formGroup.get(maxControlName);
  
      if (!minControl || !maxControl) {
        return null; // Return null if controls are not found
      }
  
      const min = minControl.value;
      const max = maxControl.value;
  
      if (min !== null && max !== null && min >= max) {
        return { 'minMaxError': true };
      }
  
      // Clear the error if it was previously set
      if (minControl.errors && minControl.errors['minMaxError']) {
        delete minControl.errors['minMaxError'];
        if (Object.keys(minControl.errors).length === 0) {
          minControl.setErrors(null);
        }
      }
  
      return null;
    };
  }
  

