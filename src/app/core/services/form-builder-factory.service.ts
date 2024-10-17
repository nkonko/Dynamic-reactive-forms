import { Injectable } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { ValidatorsEnum } from "../models/enums/validators.enum";
import { FormBuilderField } from "../models/form-builder-field.interface";
import { InputConfig } from "../models/field-config/input-confg.interface";
import { ValidatorsOfField } from "../models/validation-of-field.interface";
import { SelectConfig } from "../models/field-config/select-config.interface";
import { CheckboxConfig } from "../models/field-config/checkbox-config.interface";

@Injectable({
  providedIn: "root",
})
export class FormBuilderFactoryService {
  constructor(private fb: FormBuilder) {}

  buildForm(fields: FormBuilderField): FormGroup {
    const formGroup = this.fb.group({});

    if (fields.inputs) {
      fields.inputs.forEach((input: InputConfig) => {

        formGroup.addControl(
          input.base.name,
          this.createControl(input.base.disabled, input.base.value, input.base.validation)
        );
      });
    }

    if(fields.selects) {
      fields.selects.forEach((select: SelectConfig) => {
        formGroup.addControl(
          select.base.name,
          this.createControl(select.base.disabled, select.base.value, select.base.validation)
        );
      });
    }

    if(fields.checkboxes) {
      fields.checkboxes.forEach((checkbox: CheckboxConfig) => {

        formGroup.addControl(
          checkbox.base.name,
          this.createControl(checkbox.base.disabled, checkbox.checked, checkbox.base.validation)
        );
      });
    }

    return formGroup;
  }

  private createControl<T>(disabled: boolean, value: T, validation?: ValidatorsOfField) {
    const validators = validation ? this.getValidators(validation) : [];
    return this.fb.control({ disabled, value }, validators);
  }

  private getValidators(validation: ValidatorsOfField): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (validation.validators && validation.validators.length > 0) {

      validation.validators!.forEach((validator) => {
        if (validator === ValidatorsEnum.required) {
          validators.push(Validators.required);
        }

        if (validator === ValidatorsEnum.requiredTrue) {
          validators.push(Validators.requiredTrue);
        }

        if (validator === ValidatorsEnum.minLength && validation.minLength) {
          validators.push(Validators.minLength(validation!.minLength));
        }

        if (validator === ValidatorsEnum.maxLength && validation.maxLength) {
          validators.push(Validators.maxLength(validation.maxLength));
        }

        if (validator === ValidatorsEnum.pattern && validation.pattern) {
          validators.push(Validators.pattern(validation.pattern));
        }
      });
    }

    return validators;
  }
}
