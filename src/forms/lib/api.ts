const API_KEY = import.meta.env.VITE_HAWKEYE_API_KEY || '';
const HAWKEYE_URL = import.meta.env.VITE_HAWKEYE_API_URL || '';
const IS_DEV = import.meta.env.DEV;
// Dev uses Vite proxy to avoid CORS; production calls the API directly
const API_BASE = HAWKEYE_URL
  ? IS_DEV ? '/hawkeye/rest' : `${HAWKEYE_URL}/rest`
  : '';

const FORM_TO_CRM_OBJECT: Record<string, string> = {
  'tenant-onboarding': 'tenants',
  'landlord-onboarding': 'merchants',
  'landlord-onboarding-basic': 'merchants',
  'homeowner-onboarding': 'merchants',
  'property-lead-capture': 'propertyPids',
  'property-lead-capture-v1': 'propertyPids',
  'supply-property-details': 'propertyPids',
  'landlord-property-details': 'propertyPids',
  'property-info-capture': 'propertyPids',
  'contract-creation': 'contracts',
  'landlord-inbound': 'merchants',
};

const TENANT_FIELD_MAP: Record<string, string> = {
  firstName: 'name.firstName',
  lastName: 'name.lastName',
  email: 'email.primaryEmail',
  phone: 'mobilePhone.primaryPhoneNumber',
  company: 'employerName',
  linkedin: 'linkedinUrl.primaryLinkUrl',
  twitterHandle: 'twitterUrl.primaryLinkUrl',
  roomId: 'currentRid',
  role: 'occupation',
  panNumber: 'pan',
  aadhaarNumber: 'aadhaarNumber',
  dateOfBirth: 'dateOfBirth',
  permanentAddress: 'legalAddress',
  discoverySource: 'firstInquiryChannel',
};

const MERCHANT_FIELD_MAP: Record<string, string> = {
  firstName: 'name.firstName',
  lastName: 'name.lastName',
  ownerName: 'name.firstName',
  email: 'email.primaryEmail',
  phone: 'phone.primaryPhoneNumber',
  panNumber: 'panNumber',
};

const PROPERTY_FIELD_MAP: Record<string, string> = {
  propertyName: 'pid',
  address: 'propertyAddress.markdown',
  city: 'city',
};

const FIELD_MAPS: Record<string, Record<string, string>> = {
  tenants: TENANT_FIELD_MAP,
  merchants: MERCHANT_FIELD_MAP,
  propertyPids: PROPERTY_FIELD_MAP,
};

// Fields the form collects that don't map to CRM fields — strip before sending
const IGNORED_FIELDS = new Set([
  'hasReferral', 'referralFriendName', 'referralFriendContact', 'voucherCode',
  'nonVegOk', 'smokingFlatmatesOk', 'parking', 'movingFrom',
  'consentWebsite', 'consentBgCheck', 'agreementStartDate',
  'hubspot_utk', 'hubspot_page_name', 'hubspot_page_url',
  'aadhaarFront', 'aadhaarBack', 'panCard', 'uanNumber', 'fatherName',
  'age', 'lockInPeriod', 'foodPrefs', 'smokingStatus',
]);

function headers(): Record<string, string> {
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  if (API_KEY) h['Authorization'] = `Bearer ${API_KEY}`;
  return h;
}

function mapFormDataToCrm(
  formData: Record<string, unknown>,
  objectName: string,
): Record<string, unknown> {
  const fieldMap = FIELD_MAPS[objectName];
  if (!fieldMap) return formData;

  const mapped: Record<string, unknown> = {};
  for (const [formKey, value] of Object.entries(formData)) {
    if (IGNORED_FIELDS.has(formKey)) continue;
    if (value === undefined || value === null || value === '') continue;

    const crmPath = fieldMap[formKey];
    if (crmPath && crmPath.includes('.')) {
      const [parent, child] = crmPath.split('.');
      mapped[parent] = { ...(mapped[parent] as Record<string, unknown> || {}), [child]: value };
    } else if (crmPath) {
      mapped[crmPath] = value;
    }
    // Skip unmapped fields — don't send unknown keys to the API
  }

  // Add phone country code defaults for composite phone fields
  if (mapped['mobilePhone']) {
    mapped['mobilePhone'] = {
      primaryPhoneCountryCode: 'IN',
      primaryPhoneCallingCode: '+91',
      ...(mapped['mobilePhone'] as Record<string, unknown>),
    };
  }

  return mapped;
}

async function hawkeyePost(path: string, body: unknown): Promise<unknown> {
  if (!API_BASE) {
    console.warn('[forms] No Hawkeye API configured — skipping POST to', path);
    return { success: true, submissionId: 'local-preview' };
  }
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error(`[forms] Hawkeye POST ${path} failed:`, res.status, text);
    throw new Error(`Hawkeye API error: ${res.status}`);
  }
  return res.json();
}

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

export async function submitForm(data: unknown) {
  const formData = data as Record<string, unknown>;
  const formId = formData.formId as string;

  const crmObject = formId ? FORM_TO_CRM_OBJECT[formId] : undefined;

  if (crmObject && API_BASE) {
    const { formId: _, ...fields } = formData;
    const mapped = mapFormDataToCrm(fields, crmObject);
    try {
      const result = await hawkeyePost(`/${crmObject}`, mapped);
      return { success: true, submissionId: (result as Record<string, unknown>).id || 'created' };
    } catch (err) {
      console.error('[forms] CRM create failed, falling back:', err);
    }
  }

  // Fallback: store as a note if no object mapping or if creation failed
  if (API_BASE) {
    try {
      await hawkeyePost('/notes', {
        title: `Form submission: ${formId}`,
        body: { markdown: JSON.stringify(formData, null, 2) },
      });
      return { success: true, submissionId: 'note-created' };
    } catch {
      // silent fallback
    }
  }

  return { success: true, submissionId: 'local-preview' };
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
  if (WEBHOOK_URL) {
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      // non-blocking
    }
    return;
  }

  // Stream step answers to Hawkeye as notes for tracking
  if (API_BASE && payload.isLastStep) {
    try {
      await hawkeyePost('/notes', {
        title: `[${payload.formId}] Step: ${payload.stepTitle}`,
        body: { markdown: `Session: ${payload.sessionId}\n\n${JSON.stringify(payload.answer, null, 2)}` },
      });
    } catch {
      // non-blocking
    }
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
