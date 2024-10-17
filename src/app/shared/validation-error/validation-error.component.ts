import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatError } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { ValidationErrorConfig } from '../../core/models/validation-error-config.interface';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-validation-error',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatError, AsyncPipe] ,
  templateUrl: './validation-error.component.html',
  styles: ``
})
export class ValidationErrorComponent implements OnInit, OnDestroy {
  @Input({required: true}) control!: AbstractControl | FormControl;

  private errorMessageSubject = new BehaviorSubject<string>('');
  private unsubscribe$ = new Subject<void>();
  protected errorMessage$ = this.errorMessageSubject.asObservable();

  private mockedValidationMessages: ValidationErrorConfig['validationMessages'] = {
    'required': 'This field is required',
    'minlength': 'This field must be at least {{minLength}} characters long',
    'maxlength': 'This field must be at most {{maxLength}} characters long',
    'pattern': 'This field must match the specified pattern',
    'email': 'This field must be a valid email',
    'minDate': 'This field must be after {{minDate}}',
    'maxDate': 'This field must be before {{maxDate}}',
    'number': 'This field must be a number',
    'date': 'This field must be a date',
    'time': 'This field must be a time'
  };
  
  ngOnInit(): void {
    this.control.statusChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.updateErrorMessages();
    });

    this.updateErrorMessages();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private updateErrorMessages(): void {
    let message: string = '';
    const errors = this.control.errors;

    if (errors) {
      for (const errorKey in errors) {
        if (errors.hasOwnProperty(errorKey)) {
          const errorMessage = this.mockedValidationMessages[errorKey];
          
          if (typeof errorMessage === 'string') {
            message = errorMessage;
          } 
          
        }
      }
    }

    this.errorMessageSubject.next(message);
  }

}
