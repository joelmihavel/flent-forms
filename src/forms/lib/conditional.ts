import type { ConditionalRule } from '../schema/types';

export function evaluateCondition(
  rule: ConditionalRule,
  data: Record<string, unknown>
): boolean {
  const fieldValue = getNestedValue(data, rule.field);

  switch (rule.operator) {
    case 'eq':
      return fieldValue === rule.value;
    case 'neq':
      return fieldValue !== rule.value;
    case 'in':
      return Array.isArray(rule.value) && rule.value.includes(fieldValue);
    case 'gt':
      return typeof fieldValue === 'number' && fieldValue > (rule.value as number);
    case 'lt':
      return typeof fieldValue === 'number' && fieldValue < (rule.value as number);
    case 'gte':
      return typeof fieldValue === 'number' && fieldValue >= (rule.value as number);
    case 'lte':
      return typeof fieldValue === 'number' && fieldValue <= (rule.value as number);
    default:
      return true;
  }
}

export function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((acc: unknown, key) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj);
}

export function setNestedValue(obj: Record<string, unknown>, path: string, value: unknown): Record<string, unknown> {
  const result = { ...obj };
  const keys = path.split('.');
  let current: Record<string, unknown> = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const nextKey = keys[i + 1];
    const isArrayIndex = /^\d+$/.test(nextKey);

    if (!(key in current) || current[key] === null || current[key] === undefined) {
      current[key] = isArrayIndex ? [] : {};
    } else if (Array.isArray(current[key])) {
      current[key] = [...(current[key] as unknown[])];
    } else if (typeof current[key] === 'object') {
      current[key] = { ...(current[key] as Record<string, unknown>) };
    }
    current = current[key] as Record<string, unknown>;
  }

  current[keys[keys.length - 1]] = value;
  return result;
}
