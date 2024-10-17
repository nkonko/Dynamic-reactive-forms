import { Component, Input, OnInit } from "@angular/core";
import { FormBuilderFactoryService } from "../../core/services/form-builder-factory.service";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { KeyValuePipe } from "@angular/common";
import { GenericInputComponent } from "../generic-input/generic-input.component";
import { FormBuilderField } from "../../core/models/form-builder-field.interface";
import { InputConfig } from "../../core/models/field-config/input-confg.interface";
import { SelectConfig } from "../../core/models/field-config/select-config.interface";
import { GenericSelectComponent } from "../generic-select/generic-select.component";
import { CheckboxConfig } from "../../core/models/field-config/checkbox-config.interface";
import { GenericCheckboxComponent } from "../generic-checkbox/generic-checkbox.component";

@Component({
  selector: "app-custom-form-builder",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    KeyValuePipe,
    GenericInputComponent,
    GenericSelectComponent,
    GenericCheckboxComponent
],
  templateUrl: "./custom-form-builder.component.html",
  styles: ``,
})
export class CustomFormBuilderComponent implements OnInit {
  @Input({ required: true }) fields!: FormBuilderField;
  protected form!: FormGroup;
  protected inputConfigs: { [key: string]: InputConfig } = {};
  protected selectConfigs: { [key: string]: SelectConfig } = {};
  protected checkboxConfigs: { [key: string]: CheckboxConfig } = {};

  constructor(private fbFactory: FormBuilderFactoryService) {}

  ngOnInit(): void {
    this.form = this.fbFactory.buildForm(this.fields);
    this.setConfigs();
  }

  submit() {
    if (this.form.valid) {
      console.log('valid form:', this.form.value);
    } else {
      console.log('invalid form:', this.form.value);
      console.log('complete form:', this.form);
    }
  }

  setConfigs() {
    if (this.fields.inputs) {
      this.fields.inputs!.forEach((input) => {
        this.inputConfigs[input.base.name] = input;
      });
    }

    if (this.fields.selects) {
      this.fields.selects!.forEach((select) => {
        this.selectConfigs[select.base.name] = select;
      });
    }

    if (this.fields.checkboxes) {
      this.fields.checkboxes!.forEach((checkbox) => {
        this.checkboxConfigs[checkbox.base.name] = checkbox;
      });
    }
  }
}
