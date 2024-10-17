import { ValidatorsEnum } from "./enums/validators.enum";

export interface ValidatorsOfField {
    validators?: ValidatorsEnum[],
    minLength?: number,
    maxLength?: number,
    pattern?: RegExp,
}