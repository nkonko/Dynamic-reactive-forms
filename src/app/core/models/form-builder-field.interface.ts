import { CheckboxConfig } from "./field-config/checkbox-config.interface";
import { InputConfig } from "./field-config/input-confg.interface";
import { SelectConfig } from "./field-config/select-config.interface";

export interface FormBuilderField {
    inputs?: InputConfig[],
    selects?: SelectConfig[],
    checkboxes?: CheckboxConfig[]
}