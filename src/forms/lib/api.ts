// Stub API for form preview mode — no actual network calls

export async function sendOTP(_phone: string) {
  return { success: true, otpId: 'preview-otp' };
}

export async function verifyOTP(_otpId: string, _code: string) {
  return { success: true, verified: true };
}

export async function verifyPAN(_pan: string) {
  return { valid: true, name: 'Preview Name', type: 'Individual' };
}

export async function lookupIFSC(_ifsc: string) {
  return { bank: 'Preview Bank', branch: 'Preview Branch', city: 'Preview City' };
}

export async function verifyBank(_accountNumber: string, _ifsc: string) {
  return { verified: true, beneficiaryName: 'Preview Name' };
}

export async function uploadFile(
  _file: File,
  onProgress?: (pct: number) => void,
): Promise<{ id: string; url: string }> {
  if (onProgress) onProgress(100);
  return { id: 'preview-file', url: '' };
}

export async function runOCR(_fileUrl: string) {
  return {};
}

export async function saveDraft(_data: unknown) {
  return { success: true, savedAt: new Date().toISOString() };
}

export async function submitForm(_data: unknown) {
  return { success: true, submissionId: 'preview' };
}

export function getHiddenFields(config?: { name: string; source: string; value?: string }[]): Record<string, string> {
  if (!config) return {};
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  for (const field of config) {
    if (field.source === 'url') {
      result[field.name] = params.get(field.name) || '';
    } else if (field.source === 'constant' && field.value) {
      result[field.name] = field.value;
    }
  }
  return result;
}

export interface StepAnswerPayload {
  formId: string;
  sessionId: string;
  stepId: string;
  stepIndex: number;
  stepType: string;
  stepTitle: string;
  answer: Record<string, unknown>;
  allData: Record<string, unknown>;
  isLastStep: boolean;
  timestamp: string;
}

const WEBHOOK_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WEBHOOK_URL) || '';

export async function sendStepAnswer(payload: StepAnswerPayload): Promise<void> {
  if (!WEBHOOK_URL) return;
  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // non-blocking
  }
}

export async function dispatchWebhooks(
  webhooks: { url: string; method?: string; headers?: Record<string, string>; mapFields?: Record<string, string> }[],
  data: Record<string, unknown>,
): Promise<void> {
  for (const hook of webhooks) {
    let payload = data;
    if (hook.mapFields) {
      const mapped: Record<string, unknown> = {};
      for (const [targetKey, sourceKey] of Object.entries(hook.mapFields)) {
        mapped[targetKey] = data[sourceKey];
      }
      payload = mapped;
    }
    try {
      await fetch(hook.url, {
        method: (hook.method as string) || 'POST',
        headers: { 'Content-Type': 'application/json', ...(hook.headers || {}) },
        body: JSON.stringify(payload),
      });
    } catch {
      // webhook failures are non-blocking
    }
  }
}
