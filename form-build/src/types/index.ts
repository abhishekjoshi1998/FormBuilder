export type FieldType =
  | "text"
  | "number"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "date";

export const FIELD_TYPES: FieldType[] = [
  "text",
  "number",
  "textarea",
  "select",
  "radio",
  "checkbox",
  "date",
];

export type ValidationRuleType =
  | "required"
  | "minLength"
  | "maxLength"
  | "email"
  | "password";

export interface ValidationRule {
  type: ValidationRuleType;
  value?: string | number;
  message: string;
}

export interface DerivedFieldConfig {
  parentFieldIds: string[];
  formula: string; 
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  defaultValue?: any;
  options?: string[]; 
  validationRules: ValidationRule[];
  derived?: DerivedFieldConfig;
}

export interface FormSchema {
  id: string;
  name: string;
  createdAt: string; 
  fields: FormField[];
}
