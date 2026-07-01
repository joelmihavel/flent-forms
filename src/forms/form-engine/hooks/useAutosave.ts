

import { useEffect } from 'react';

interface UseAutosaveOptions {
  data: Record<string, unknown>;
  currentStepIndex: number;
  onSave: (data: Record<string, unknown>) => Promise<void>;
  debounceMs?: number;
}

export function useAutosave({ data, currentStepIndex, onSave, debounceMs = 2000 }: UseAutosaveOptions) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onSave(data).catch(() => {});
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [data, currentStepIndex, onSave, debounceMs]);
}
