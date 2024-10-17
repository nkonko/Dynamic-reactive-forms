import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-base-control-value-accessor',
  standalone: true,
  imports: [],
  template: ``,
  styles: ``
})
export abstract class BaseControlValueAccessor<T> implements ControlValueAccessor {
  value!: T;
  isDisabled = false;

  private onChange!: (value: T) => void;
  private onTouched!: () => void;

  writeValue(value: T): void {
    this.value = value;
    this.onValueChanged(value);
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  protected onValueChanged(value: T): void {
  }

  protected notifyValueChange(value: T): void {
    if (this.onChange) {
      this.onChange(value);
    }
  }

  protected notifyTouch(): void {
    if (this.onTouched) {
      this.onTouched();
    }
  }
}
