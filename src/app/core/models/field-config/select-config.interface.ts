import { BaseFieldConfig } from "./base-field-config.interface"

export interface SelectConfig {
    base: BaseFieldConfig,
    options: {
      label: string,
      value: string  
    }[]
}