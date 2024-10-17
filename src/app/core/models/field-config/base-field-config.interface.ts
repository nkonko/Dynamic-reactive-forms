import { FieldType } from "../enums/field-type.enum";
import { ValidatorsOfField } from "../validation-of-field.interface";

export interface BaseFieldConfig {
    name: string,
    value: string,
    label: string,
    type: FieldType,
    disabled: boolean,
    readOnly?: boolean,
    validation? : ValidatorsOfField,
}