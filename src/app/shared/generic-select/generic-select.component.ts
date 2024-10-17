import { Component, forwardRef, Input } from '@angular/core';
import { BaseControlValueAccessor } from '../base-control-value-accessor/base-control-value-accessor.component';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { SelectConfig } from '../../core/models/field-config/select-config.interface';

@Component({
  selector: 'app-generic-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidationErrorComponent, MatFormFieldModule, MatOptionModule, MatSelectModule],
  templateUrl:'./generic-select.component.html',
  styles: ``,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GenericSelectComponent),
    multi: true,
  }],
})
export class GenericSelectComponent extends BaseControlValueAccessor<string> {
  @Input({required: true}) config!: SelectConfig;
  @Input({required: true}) control!: AbstractControl | FormControl;

  onSelectChange(selectedValue: string): void {
    this.value = selectedValue;
    this.notifyValueChange(selectedValue); 
    this.notifyTouch();
  }

}
