import { Component, forwardRef, Input } from '@angular/core';
import { BaseControlValueAccessor } from '../base-control-value-accessor/base-control-value-accessor.component';
import { AbstractControl, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CheckboxConfig } from '../../core/models/field-config/checkbox-config.interface';
import { CommonModule } from '@angular/common';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-generic-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidationErrorComponent, MatCheckboxModule, MatLabel ],
  templateUrl: `./generic-checkbox.component.html`,
  styles: ``,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GenericCheckboxComponent),
    multi: true,
  }],
})
export class GenericCheckboxComponent extends BaseControlValueAccessor<boolean> {
  @Input({required: true}) config!: CheckboxConfig;
  @Input({required: true}) control!: AbstractControl | FormControl;

  toggleCheckbox(event: any): void {
    this.value = event.checked;
    this.notifyValueChange(this.value); 
    this.notifyTouch();
  }
}
