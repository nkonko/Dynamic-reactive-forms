import { CommonModule } from '@angular/common';
import { Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputConfig } from '../../core/models/field-config/input-confg.interface';
import { MatInput } from '@angular/material/input';
import { BaseControlValueAccessor } from '../base-control-value-accessor/base-control-value-accessor.component';

@Component({
  selector: 'app-generic-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidationErrorComponent, MatFormFieldModule, MatInput],
  templateUrl: './generic-input.component.html',
  styles: ``,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GenericInputComponent),
    multi: true,
  }],
})
export class GenericInputComponent extends BaseControlValueAccessor<string> {
  @Input({required: true}) config!: InputConfig;
  @Input({required: true}) control!: AbstractControl | FormControl;

  @ViewChild('input', {static: false}) input!: ElementRef;

  onInputChange(target: any): void {
    const newValue = target.value;
    this.value = newValue;
    this.notifyValueChange(newValue); 
    this.notifyTouch();
  }

  onBlur(): void {
    this.notifyTouch(); 
  }
}
