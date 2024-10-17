import { AbstractControl, FormControl } from "@angular/forms";

export interface ValidationErrorConfig {
    control: AbstractControl | FormControl,
    validationMessages: { [key: string]: string },
}