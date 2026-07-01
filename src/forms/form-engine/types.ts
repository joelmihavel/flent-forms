export type {
  StepType,
  SelectOption,
  ValidationRule,
  FieldDefinition,
  ConditionalRule,
  FileUploadConfig,
  RepeatableConfig,
  FormStep,
  MatrixRow,
  MatrixConfig,
  WebhookConfig,
  HiddenFieldConfig,
  FormMeta,
} from '../schema/types';

export interface FormSchema {
  id: string;
  steps: import('../schema/types').FormStep[];
  version?: string;
}

export interface FormEngineConfig {
  schema: FormSchema;
  initialData: Record<string, unknown>;
  persistKey?: string;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  onSaveDraft?: (data: Record<string, unknown>) => Promise<void>;
  customStepMap?: Record<string, React.ComponentType<CustomStepProps>>;
  adjustArrays?: (data: Record<string, unknown>) => Record<string, unknown>;
}

export interface CustomStepProps {
  step: import('../schema/types').FormStep;
  values: Record<string, string>;
  errors: Record<string, string>;
  data: Record<string, unknown>;
  getFieldValue: (name: string) => string;
  setFieldValue: (name: string, value: string) => void;
  setField: (path: string, value: unknown) => void;
  onNext: () => void;
  repeatableIndex: number;
  getCurrentItem: () => Record<string, unknown> | null;
  getFieldPath: (name: string) => string;
}
