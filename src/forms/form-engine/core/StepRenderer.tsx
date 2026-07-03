

import type { FormStep } from '../../schema/types';
import type { CustomStepProps } from '../types';
import RoleSelector from '../../components/form/RoleSelector';
import NumberPicker from '../../components/form/NumberPicker';
import FieldGroup from '../../components/form/FieldGroup';
import RatingInput from '../../components/form/RatingInput';
import NPSInput from '../../components/form/NPSInput';
import OpinionScale from '../../components/form/OpinionScale';
import YesNoInput from '../../components/form/YesNoInput';
import DropdownInput from '../../components/form/DropdownInput';
import DateInput from '../../components/form/DateInput';
import MultiSelectInput from '../../components/form/MultiSelectInput';
import MatrixInput from '../../components/form/MatrixInput';
import CheckboxAcknowledge from '../../components/form/CheckboxAcknowledge';
import LongTextInput from '../../components/form/LongTextInput';
import PhoneInput from '../../components/form/PhoneInput';
import FileUpload from '../../components/form/FileUpload';

interface StepRendererProps {
  step: FormStep;
  data: Record<string, unknown>;
  errors: Record<string, string>;
  values: Record<string, string>;
  getFieldValue: (name: string) => string;
  setFieldValue: (name: string, value: string) => void;
  setField: (path: string, value: unknown) => void;
  onNext: () => void;
  repeatableIndex: number;
  getCurrentItem: () => Record<string, unknown> | null;
  getFieldPath: (name: string) => string;
  customStepMap?: Record<string, React.ComponentType<CustomStepProps>>;
}

export default function StepRenderer({
  step,
  data,
  errors,
  values,
  getFieldValue,
  setFieldValue,
  setField,
  onNext,
  repeatableIndex,
  getCurrentItem,
  getFieldPath,
  customStepMap,
}: StepRendererProps) {
  const customProps: CustomStepProps = {
    step,
    values,
    errors,
    data,
    getFieldValue,
    setFieldValue,
    setField,
    onNext,
    repeatableIndex,
    getCurrentItem,
    getFieldPath,
  };

  if (customStepMap?.[step.id]) {
    const CustomComponent = customStepMap[step.id];
    return <CustomComponent {...customProps} />;
  }

  if (customStepMap?.[step.type]) {
    const CustomComponent = customStepMap[step.type];
    return <CustomComponent {...customProps} />;
  }

  const fieldName = (step.meta?.fieldName as string) || step.fields?.[0]?.name || step.id;

  switch (step.type) {
    case 'single-select': {
      const sf = (step.meta?.fieldName as string) || 'role';
      return (
        <RoleSelector
          step={step}
          value={String((data as Record<string, unknown>)[sf] || '')}
          onChange={(val) => setField(sf, val)}
        />
      );
    }

    case 'multi-select': {
      const current = (data as Record<string, unknown>)[fieldName];
      const arr = Array.isArray(current) ? (current as string[]) : [];
      return (
        <MultiSelectInput
          options={step.options || []}
          value={arr}
          onChange={(val) => setField(fieldName, val)}
          maxSelections={step.maxSelections}
        />
      );
    }

    case 'number-picker': {
      const field = step.fields?.[0];
      const npFieldName = field?.name || '';
      const value = (data as Record<string, number>)[npFieldName] || 1;
      return (
        <NumberPicker
          value={value}
          min={(field?.validation?.find(v => v.type === 'min')?.params?.min as number) ?? 1}
          max={(field?.validation?.find(v => v.type === 'max')?.params?.max as number) ?? 10}
          onChange={(v) => setField(npFieldName, v)}
        />
      );
    }

    case 'rating': {
      const val = (data as Record<string, number>)[fieldName] || 0;
      return (
        <RatingInput
          value={val}
          max={step.ratingMax || 5}
          onChange={(v) => setField(fieldName, v)}
        />
      );
    }

    case 'nps': {
      const val = (data as Record<string, number | null>)[fieldName] ?? null;
      return (
        <NPSInput
          value={val}
          onChange={(v) => setField(fieldName, v)}
          lowLabel={step.npsLabels?.low}
          highLabel={step.npsLabels?.high}
        />
      );
    }

    case 'opinion-scale': {
      const val = (data as Record<string, number | null>)[fieldName] ?? null;
      return (
        <OpinionScale
          value={val}
          onChange={(v) => setField(fieldName, v)}
          lowLabel={step.npsLabels?.low}
          highLabel={step.npsLabels?.high}
        />
      );
    }

    case 'yes-no': {
      return (
        <YesNoInput
          value={String((data as Record<string, unknown>)[fieldName] || '')}
          onChange={(val) => setField(fieldName, val)}
        />
      );
    }

    case 'dropdown': {
      return (
        <DropdownInput
          options={step.options || []}
          value={String((data as Record<string, unknown>)[fieldName] || '')}
          onChange={(val) => setField(fieldName, val)}
        />
      );
    }

    case 'date': {
      return (
        <DateInput
          value={String((data as Record<string, unknown>)[fieldName] || '')}
          onChange={(val) => setField(fieldName, val)}
        />
      );
    }

    case 'matrix': {
      if (!step.matrix) return null;
      const matrixValues: Record<string, string> = {};
      for (const row of step.matrix.rows) {
        matrixValues[row.id] = String((data as Record<string, unknown>)[`${fieldName}_${row.id}`] || '');
      }
      return (
        <MatrixInput
          config={step.matrix}
          values={matrixValues}
          onChange={(rowId, val) => setField(`${fieldName}_${rowId}`, val)}
        />
      );
    }

    case 'checkbox': {
      const items = step.checkboxItems || [];
      const current = (data as Record<string, unknown>)[fieldName];
      const checked = Array.isArray(current) ? (current as string[]) : [];
      return (
        <CheckboxAcknowledge
          items={items}
          checkedItems={checked}
          onChange={(val) => setField(fieldName, val)}
        />
      );
    }

    case 'long-text': {
      return (
        <LongTextInput
          value={String((data as Record<string, unknown>)[fieldName] || '')}
          onChange={(val) => setField(fieldName, val)}
          placeholder={step.fields?.[0]?.placeholder}
        />
      );
    }

    case 'phone': {
      return (
        <PhoneInput
          label={step.fields?.[0]?.label}
          value={String((data as Record<string, unknown>)[fieldName] || '')}
          onChange={(phone) => setField(fieldName, phone)}
          error={errors[fieldName]}
        />
      );
    }

    case 'text-input': {
      const fields = step.fields?.length
        ? step.fields
        : [{ name: fieldName, type: 'text' as const, label: step.title, placeholder: step.subtitle || '' }];
      return (
        <FieldGroup
          fields={fields}
          values={values}
          errors={errors}
          onChange={setFieldValue}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onNext(); } }}
        />
      );
    }

    case 'field-group':
      return (
        <FieldGroup
          fields={step.fields || []}
          values={values}
          errors={errors}
          onChange={setFieldValue}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onNext(); } }}
        />
      );

    case 'file-upload': {
      const fileConfig = step.fileUpload || { accept: ['.jpg', '.jpeg', '.png', '.pdf'], maxSizeMB: 5, label: 'Upload file' };
      const fileValue = (data as Record<string, unknown>)[fieldName] as import('../../types/form').UploadedFile | null;
      return (
        <FileUpload
          config={fileConfig}
          value={fileValue}
          onChange={(file) => setField(fieldName, file)}
        />
      );
    }

    case 'info-screen':
    case 'review':
      return null;

    default:
      return null;
  }
}
