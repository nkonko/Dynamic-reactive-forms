import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { RouterOutlet } from "@angular/router";
import { CustomFormBuilderComponent } from "./shared/custom-form-builder/custom-form-builder.component";
import { ValidatorsEnum } from "./core/models/enums/validators.enum";
import { ValidatorsRegex } from "./core/constants/form-validations-regex.constant";
import { FormBuilderField } from "./core/models/form-builder-field.interface";
import { FieldType } from "./core/models/enums/field-type.enum";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MatFormFieldModule,
    CustomFormBuilderComponent,
  ],
  template: `
    <app-custom-form-builder [fields]="fields"></app-custom-form-builder>
  `,
  styles: [],
})
export class AppComponent {
  fields: FormBuilderField = {
    inputs: [
      {
        base: {
          name: "Name",
          label: "Name",
          type: FieldType.text,
          value: "",
          disabled: false,
          readOnly: false,
          validation: {
            validators: [
              ValidatorsEnum.required,
              ValidatorsEnum.minLength,
              ValidatorsEnum.maxLength,
            ],
            minLength: 3,
            maxLength: 15,
          },
        },
      },
      {
        base: {
          name: "Email",
          label: "Email",
          type: FieldType.text,
          value: "test@test.com",
          disabled: false,
          readOnly: false,
          validation: {
            validators: [ValidatorsEnum.required, ValidatorsEnum.pattern],
            pattern: ValidatorsRegex.email,
          },
        },
      },
      {
        base: {
          name: "Phone",
          label: "Phone",
          type: FieldType.text,
          value: "12345",
          disabled: true,
          readOnly: false,
          validation: {
            validators: [ValidatorsEnum.required, ValidatorsEnum.pattern],
            pattern: ValidatorsRegex.phone,
          },
        },
      },
      {
        base: {
          name: "Address",
          label: "Address",
          type: FieldType.text,
          value: "Test ReadOnly Address",
          disabled: false,
          readOnly: true,
        },
      },
    ],
    selects: [
      {
        base: {
          name: "Country",
          label: "Country",
          type: FieldType.select,
          value: "",
          disabled: false,
          readOnly: false,
        },
        options: [
          {
            label: "Argentina",
            value: "Argentina",
          },
          {
            label: "Colombia",
            value: "Colombia",
          },
          {
            label: "Mexico",
            value: "Mexico",
          },
        ],
      },
    ],
    checkboxes: [
      {
        base: {
          name: "TestCheckbox",
          label: "Test Checkbox",
          type: FieldType.checkbox,
          value: '',
          disabled: false,
          readOnly: false,
          validation: {
            validators: [ ValidatorsEnum.requiredTrue],
          },
        },
        checked: false
      }
    ]
  };
}
