export type StepType =
  | 'welcome'
  | 'single-select'
  | 'multi-select'
  | 'number-picker'
  | 'field-group'
  | 'file-upload'
  | 'text-input'
  | 'long-text'
  | 'info-screen'
  | 'review'
  | 'rating'
  | 'nps'
  | 'opinion-scale'
  | 'yes-no'
  | 'dropdown'
  | 'date'
  | 'matrix'
  | 'phone'
  | 'checkbox';

export interface SelectOption {
  label: string;
  value: string;
  description?: string;
  icon?: string;
}

export interface ValidationRule {
  type: 'required' | 'regex' | 'minLength' | 'maxLength' | 'min' | 'max' | 'email' | 'phone' | 'pan' | 'ifsc' | 'match' | 'custom';
  params?: Record<string, unknown>;
  message: string;
}

export interface FieldDefinition {
  name: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'select' | 'file' | 'password' | 'textarea';
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: ValidationRule[];
  options?: SelectOption[];
  prefix?: string;
  helperText?: string;
  autoFillFrom?: string;
}

export interface ConditionalRule {
  field: string;
  operator: 'eq' | 'neq' | 'in' | 'gt' | 'lt' | 'gte' | 'lte';
  value: unknown;
}

export interface FileUploadConfig {
  accept: string[];
  maxSizeMB: number;
  label: string;
  description?: string;
  ocrEnabled?: boolean;
}

export interface RepeatableConfig {
  countField: string;
  itemLabel: string;
  dataArrayField: string;
}

export interface MatrixRow {
  id: string;
  label: string;
}

export interface MatrixConfig {
  rows: MatrixRow[];
  columns: SelectOption[];
}

export interface WebhookConfig {
  url: string;
  method?: 'POST' | 'PUT';
  headers?: Record<string, string>;
  mapFields?: Record<string, string>;
}

export interface HiddenFieldConfig {
  name: string;
  source: 'url' | 'constant';
  value?: string;
}

export interface FormMeta {
  estimatedTime?: string;
  overline?: string;
  ctaLabel?: string;
  documentsRequired?: string[];
  icon?: string;
  fieldName?: string;
  audience?: 'tenant' | 'landlord' | 'prospect' | 'internal';
  webhooks?: WebhookConfig[];
  hiddenFields?: HiddenFieldConfig[];
  successTitle?: string;
  successSubtitle?: string;
  successCtaLabel?: string;
  successCtaUrl?: string;
  [key: string]: unknown;
}

export interface FormStep {
  id: string;
  type: StepType;
  title: string;
  subtitle?: string;
  fields?: FieldDefinition[];
  validation?: ValidationRule[];
  condition?: ConditionalRule;
  repeatable?: RepeatableConfig;
  fileUpload?: FileUploadConfig;
  options?: SelectOption[];
  asyncValidation?: string;
  nextOverride?: Record<string, string>;
  meta?: FormMeta;
  matrix?: MatrixConfig;
  maxSelections?: number;
  checkboxItems?: string[];
  ratingMax?: number;
  npsLabels?: { low: string; high: string };
}
