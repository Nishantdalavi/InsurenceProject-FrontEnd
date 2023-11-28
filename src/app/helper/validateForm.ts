import { FormControl, FormGroup } from "@angular/forms";
import { AbstractControl, ValidatorFn } from '@angular/forms';
export class ValidateForm {

  static validateAllFormFileds(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control?.markAsDirty({ onlySelf: true });
      }
      else if (control instanceof FormGroup) {
        this.validateAllFormFileds(control)
      }

    });
  }

  static onlyCharactersValidator(control: FormControl<string>): { [key: string]: any } | null {
    const regex = /^[a-zA-Z]+$/;

    if (!regex.test(control.value)) {
      return {
        onlyCharacters: {
          message: 'Only characters are allowed.',
        },
      };
    }

    return null;
  }

  static passwordPatternValidator(control: FormControl): { [key: string]: any } | null {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=-])(?=.{8,})/;
  
    if (!regex.test(control.value)) {
      return {
        passwordValidator: {
          message: `Password must contain at least 8 characters<br>
           one uppercase letter, one lowercase letter<br>
           one number, and one special character.`
        },
      };
    }
  
    return null;
  }
  

 static confirmPasswordValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl) => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);
  
      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ confirmPassword: true });
      } else {
        matchingControl?.setErrors(null);
      }
  
      return null;
    };
  }


 static  rangeValidator(min: number, max: number): any {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (value < min || value > max) {
      return { 'rangeError': { min, max } };
    }

    return null;
  };
}
}