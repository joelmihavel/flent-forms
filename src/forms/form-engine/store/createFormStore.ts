

import { create } from 'zustand';
import type { StateCreator, StoreApi, UseBoundStore } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { FormStep } from '../../schema/types';
import { evaluateCondition } from '../../lib/conditional';

export interface FormStoreState {
  sessionId: string;
  currentStepIndex: number;
  repeatableIndex: number;
  direction: number;
  data: Record<string, unknown>;
  errors: Record<string, string>;
  stepHistory: number[];
  submitted: boolean;

  setField: (path: string, value: unknown) => void;
  setErrors: (errors: Record<string, string>) => void;
  clearErrors: () => void;
  goToStep: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setRepeatableIndex: (index: number) => void;
  setData: (data: Partial<Record<string, unknown>>) => void;
  resetForm: () => void;
  setSubmitted: (v: boolean) => void;
}

function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function resolveNextStepIndex(
  schema: FormStep[],
  currentIndex: number,
  data: Record<string, unknown>,
  dir: 1 | -1
): number {
  let idx = currentIndex + dir;
  while (idx >= 0 && idx < schema.length) {
    const step = schema[idx];
    if (step.condition) {
      if (!evaluateCondition(step.condition, data)) {
        idx += dir;
        continue;
      }
    }
    return idx;
  }
  return currentIndex;
}

interface CreateFormStoreOptions {
  schema: FormStep[];
  initialData: Record<string, unknown>;
  persistKey?: string;
}

export function createFormStore(
  options: CreateFormStoreOptions
): UseBoundStore<StoreApi<FormStoreState>> {
  const { schema, initialData, persistKey } = options;

  const createInitial = () => structuredClone(initialData);

  const storeCreator: StateCreator<FormStoreState> = (set, get) => ({
    sessionId: generateSessionId(),
    currentStepIndex: 0,
    repeatableIndex: 0,
    direction: 1,
    data: createInitial(),
    errors: {},
    stepHistory: [0],
    submitted: false,

    setField: (path, value) => {
      set((state) => {
        const newData = structuredClone(state.data);
        const keys = path.split('.');
        let current: Record<string, unknown> = newData;

        for (let i = 0; i < keys.length - 1; i++) {
          const key = keys[i];
          const nextKey = keys[i + 1];
          const idx = parseInt(nextKey);

          if (Array.isArray(current[key])) {
            current[key] = [...(current[key] as unknown[])];
          } else if (typeof current[key] === 'object' && current[key] !== null) {
            current[key] = { ...(current[key] as Record<string, unknown>) };
          } else if (!isNaN(idx)) {
            current[key] = [];
          } else {
            current[key] = {};
          }
          current = current[key] as Record<string, unknown>;
        }
        current[keys[keys.length - 1]] = value;
        return { data: newData };
      });
    },

    setErrors: (errors) => set(() => ({ errors })),
    clearErrors: () => set(() => ({ errors: {} })),

    goToStep: (index) => {
      set((state) => ({
        currentStepIndex: index,
        repeatableIndex: 0,
        direction: index > state.currentStepIndex ? 1 : -1,
        stepHistory: [...state.stepHistory, index],
        errors: {},
      }));
    },

    nextStep: () => {
      const state = get();
      const step = schema[state.currentStepIndex];

      if (step.repeatable) {
        const count = (state.data as Record<string, number>)[step.repeatable.countField] || 1;
        if (state.repeatableIndex < count - 1) {
          set(() => ({ repeatableIndex: state.repeatableIndex + 1, direction: 1, errors: {} }));
          return;
        }
      }

      const nextIdx = resolveNextStepIndex(schema, state.currentStepIndex, state.data, 1);
      if (nextIdx !== state.currentStepIndex) {
        set(() => ({
          currentStepIndex: nextIdx,
          repeatableIndex: 0,
          direction: 1,
          stepHistory: [...state.stepHistory, nextIdx],
          errors: {},
        }));
      }
    },

    prevStep: () => {
      const state = get();
      const step = schema[state.currentStepIndex];

      if (step.repeatable && state.repeatableIndex > 0) {
        set(() => ({ repeatableIndex: state.repeatableIndex - 1, direction: -1, errors: {} }));
        return;
      }

      const prevIdx = resolveNextStepIndex(schema, state.currentStepIndex, state.data, -1);
      if (prevIdx !== state.currentStepIndex) {
        const prevStepDef = schema[prevIdx];
        let repIdx = 0;
        if (prevStepDef.repeatable) {
          const count = (state.data as Record<string, number>)[prevStepDef.repeatable.countField] || 1;
          repIdx = count - 1;
        }
        set(() => ({
          currentStepIndex: prevIdx,
          repeatableIndex: repIdx,
          direction: -1,
          stepHistory: [...state.stepHistory, prevIdx],
          errors: {},
        }));
      }
    },

    setRepeatableIndex: (index) => set(() => ({ repeatableIndex: index })),

    setData: (partial) => {
      set((state) => ({ data: { ...state.data, ...partial } }));
    },

    resetForm: () => {
      set(() => ({
        sessionId: generateSessionId(),
        currentStepIndex: 0,
        repeatableIndex: 0,
        direction: 1,
        data: createInitial(),
        errors: {},
        stepHistory: [0],
        submitted: false,
      }));
    },

    setSubmitted: (v) => set(() => ({ submitted: v })),
  });

  if (persistKey) {
    return create<FormStoreState>()(
      persist(
        storeCreator,
        {
          name: persistKey,
          storage: createJSONStorage(() => {
            if (typeof window !== 'undefined') return localStorage;
            return {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            };
          }),
          partialize: (state) => ({
            sessionId: state.sessionId,
            currentStepIndex: state.currentStepIndex,
            repeatableIndex: state.repeatableIndex,
            data: state.data,
            stepHistory: state.stepHistory,
            submitted: state.submitted,
          }),
        }
      )
    );
  }

  return create<FormStoreState>()(storeCreator);
}
