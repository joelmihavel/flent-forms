import type { ValidationRule } from '../schema/types';
import { PATTERNS } from './constants';

export function validateField(
  value: unknown,
  rules: ValidationRule[],
  context?: Record<string, unknown>
): string | null {
  for (const rule of rules) {
    const error = runRule(value, rule, context);
    if (error) return error;
  }
  return null;
}

function runRule(
  value: unknown,
  rule: ValidationRule,
  context?: Record<string, unknown>
): string | null {
  const str = typeof value === 'string' ? value.trim() : '';
  const num = typeof value === 'number' ? value : parseFloat(str);

  switch (rule.type) {
    case 'required':
      if (!str && typeof value !== 'number') return rule.message;
      break;

    case 'regex': {
      const pattern = new RegExp(rule.params?.pattern as string);
      if (str && !pattern.test(str)) return rule.message;
      break;
    }

    case 'minLength': {
      const min = rule.params?.min as number;
      if (str && str.length < min) return rule.message;
      break;
    }

    case 'maxLength': {
      const max = rule.params?.max as number;
      if (str && str.length > max) return rule.message;
      break;
    }

    case 'min': {
      const min = rule.params?.min as number;
      if (num < min) return rule.message;
      break;
    }

    case 'max': {
      const max = rule.params?.max as number;
      if (num > max) return rule.message;
      break;
    }

    case 'email':
      if (str && !PATTERNS.EMAIL.test(str)) return rule.message;
      break;

    case 'phone':
      if (str && !PATTERNS.PHONE.test(str)) return rule.message;
      break;

    case 'pan':
      if (str && !PATTERNS.PAN.test(str.toUpperCase())) return rule.message;
      break;

    case 'ifsc':
      if (str && !PATTERNS.IFSC.test(str.toUpperCase())) return rule.message;
      break;

    case 'match': {
      const matchField = rule.params?.field as string;
      if (context && str && str !== context[matchField]) return rule.message;
      break;
    }

    case 'custom':
      break;
  }
  return null;
}

export function validateStep(
  fields: { name: string; value: unknown; rules?: ValidationRule[] }[],
  context?: Record<string, unknown>
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const field of fields) {
    if (field.rules) {
      const error = validateField(field.value, field.rules, context);
      if (error) errors[field.name] = error;
    }
  }
  return errors;
}
