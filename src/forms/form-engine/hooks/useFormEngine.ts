

import { useCallback, useMemo } from 'react';
import type { FormStep } from '../../schema/types';
import { validateField } from '../../lib/validation';
import { evaluateCondition } from '../../lib/conditional';
import type { FormStoreState } from '../store/createFormStore';

interface UseFormEngineOptions {
  schema: FormStep[];
  store: FormStoreState;
}

export function useFormEngine({ schema, store }: UseFormEngineOptions) {
  const { currentStepIndex, repeatableIndex, direction, data, errors } = store;
  const step = schema[currentStepIndex];

  const { effectiveSteps, effectiveCurrent } = useMemo(() => {
    const visible = schema.filter((s) => {
      if (!s.condition) return true;
      return evaluateCondition(s.condition, data as Record<string, unknown>);
    });
    const currentPos = visible.findIndex((s) => s.id === step.id);
    return { effectiveSteps: visible.length, effectiveCurrent: currentPos + 1 };
  }, [data, step.id, schema]);

  const getRepeatableLabel = useCallback(() => {
    if (!step.repeatable) return '';
    const count = (data as Record<string, number>)[step.repeatable.countField] || 1;
    return `${step.repeatable.itemLabel} ${repeatableIndex + 1} of ${count}`;
  }, [step, repeatableIndex, data]);

  const getFieldPath = useCallback((fieldName: string): string => {
    if (step.repeatable) {
      return `${step.repeatable.dataArrayField}.${repeatableIndex}.${fieldName}`;
    }
    return fieldName;
  }, [step, repeatableIndex]);

  const getFieldValue = useCallback((fieldName: string): string => {
    if (step.repeatable) {
      const arr = (data as Record<string, unknown[]>)[step.repeatable.dataArrayField];
      if (arr && arr[repeatableIndex]) {
        return String((arr[repeatableIndex] as Record<string, unknown>)[fieldName] || '');
      }
      return '';
    }
    if (fieldName.includes('.')) {
      const parts = fieldName.split('.');
      let val: unknown = data;
      for (const p of parts) {
        if (val && typeof val === 'object') val = (val as Record<string, unknown>)[p];
        else return '';
      }
      return String(val || '');
    }
    return String((data as Record<string, unknown>)[fieldName] || '');
  }, [step, repeatableIndex, data]);

  const setFieldValue = useCallback((fieldName: string, value: string) => {
    store.setField(getFieldPath(fieldName), value);
    const newErrors = { ...errors };
    delete newErrors[fieldName];
    store.setErrors(newErrors);
  }, [store, getFieldPath, errors]);

  const getCurrentItem = useCallback((): Record<string, unknown> | null => {
    if (!step.repeatable) return null;
    const arr = (data as Record<string, unknown[]>)[step.repeatable.dataArrayField];
    return (arr?.[repeatableIndex] as Record<string, unknown>) || null;
  }, [step, repeatableIndex, data]);

  const getValues = useCallback((): Record<string, string> => {
    if (step.fields) {
      const vals: Record<string, string> = {};
      for (const field of step.fields) {
        vals[field.name] = getFieldValue(field.name);
      }
      return vals;
    }
    return {};
  }, [step, getFieldValue]);

  const validateCurrentStep = useCallback((): boolean => {
    if (!step.fields) return true;
    const newErrors: Record<string, string> = {};
    for (const field of step.fields) {
      if (!field.validation) continue;
      const value = getFieldValue(field.name);
      const context: Record<string, unknown> = {};
      if (step.repeatable) {
        const item = getCurrentItem();
        if (item) Object.assign(context, item);
      }
      const error = validateField(value, field.validation, context);
      if (error) newErrors[field.name] = error;
    }
    store.setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [step, getFieldValue, getCurrentItem, store]);

  return {
    step,
    currentStepIndex,
    repeatableIndex,
    direction,
    data,
    errors,
    effectiveSteps,
    effectiveCurrent,
    getRepeatableLabel,
    getFieldPath,
    getFieldValue,
    setFieldValue,
    getCurrentItem,
    getValues,
    validateCurrentStep,
  };
}
