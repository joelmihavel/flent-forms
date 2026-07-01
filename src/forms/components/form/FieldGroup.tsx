

import type { FieldDefinition } from '../../schema/types';
import Input from '../ui/Input';
import TextareaInput from '../ui/TextareaInput';
import SelectInput from '../ui/SelectInput';
import PasswordInput from '../ui/PasswordInput';
import PhoneInput from './PhoneInput';
import { COLORS } from '../../lib/constants';

interface Props {
  fields: FieldDefinition[];
  values: Record<string, string>;
  errors: Record<string, string>;
  onChange: (name: string, value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  readOnlyFields?: string[];
}

export default function FieldGroup({ fields, values, errors, onChange, onKeyDown, readOnlyFields = [] }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, width: '100%' }}>
      {fields.map((field, i) => {
        const isReadOnly = readOnlyFields.includes(field.name);

        if (field.type === 'tel') {
          return (
            <div key={field.name}>
              <PhoneInput
                label={field.label}
                value={values[field.name] || ''}
                onChange={(phone) => onChange(field.name, phone)}
                error={errors[field.name]}
                autoFocus={i === 0}
                onKeyDown={onKeyDown}
              />
            </div>
          );
        }

        if (field.type === 'textarea') {
          return (
            <div key={field.name}>
              <TextareaInput
                label={field.label}
                placeholder={field.placeholder}
                value={values[field.name] || ''}
                error={!!errors[field.name]}
                errorMessage={errors[field.name]}
                onChange={(e) => onChange(field.name, e.target.value)}
                autoFocus={i === 0}
                helperText={field.helperText}
                maxLength={(field.validation?.find(v => v.type === 'maxLength')?.params?.max as number) || undefined}
              />
            </div>
          );
        }

        if (field.type === 'select') {
          return (
            <div key={field.name}>
              <SelectInput
                label={field.label}
                placeholder={field.placeholder}
                value={values[field.name] || ''}
                options={field.options || []}
                error={!!errors[field.name]}
                errorMessage={errors[field.name]}
                onChange={(val) => onChange(field.name, val)}
                autoFocus={i === 0}
                helperText={field.helperText}
              />
            </div>
          );
        }

        if (field.type === 'password') {
          return (
            <div key={field.name}>
              <PasswordInput
                label={field.label}
                placeholder={field.placeholder}
                value={values[field.name] || ''}
                error={!!errors[field.name]}
                errorMessage={errors[field.name]}
                onChange={(e) => onChange(field.name, e.target.value)}
                onKeyDown={onKeyDown}
                autoFocus={i === 0}
              />
            </div>
          );
        }

        return (
          <div key={field.name}>
            <Input
              label={field.label}
              placeholder={field.placeholder}
              value={values[field.name] || ''}
              type={field.type === 'email' ? 'email' : field.type === 'number' ? 'number' : 'text'}
              error={!!errors[field.name]}
              errorMessage={errors[field.name]}
              onChange={(e) => onChange(field.name, e.target.value)}
              onKeyDown={onKeyDown}
              autoFocus={i === 0}
              helperText={field.helperText}
              readOnly={isReadOnly}
            />
            {isReadOnly && (
              <div style={{ fontSize: 11, color: COLORS.primary, marginTop: 4, fontStyle: 'italic' }}>
                Auto-filled from IFSC lookup
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
