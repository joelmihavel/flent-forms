const API_KEY = import.meta.env.VITE_HAWKEYE_API_KEY || '';
const HAWKEYE_URL = import.meta.env.VITE_HAWKEYE_API_URL || '';
const IS_DEV = import.meta.env.DEV;
// Dev uses Vite proxy to avoid CORS; production calls the API directly
const API_BASE = HAWKEYE_URL
  ? IS_DEV ? '/hawkeye/rest' : `${HAWKEYE_URL}/rest`
  : '';

// ── CRM object routing ──────────────────────────────────────────────
// Forms that create a record in a specific CRM object.
// Forms NOT listed here fall through to the Notes fallback.
const FORM_TO_CRM_OBJECT: Record<string, string> = {
  'tenant-onboarding': 'tenants',
  'reserve-intent': 'tenants',
  'waitlist': 'tenants',
  'landlord-onboarding': 'merchants',
  'landlord-inbound': 'merchants',
  'supply-property-details': 'propertyPids',
  'contract-creation': 'contracts',
};

// Forms that need special multi-record handling (not simple single-object create)
const MULTI_RECORD_FORMS = new Set([
  'landlord-onboarding-basic',
  'homeowner-onboarding',
]);

// Forms that are purely Notes (surveys, feedback, scouting, handover checklists)
const NOTES_ONLY_FORMS = new Set([
  'property-lead-capture',
  'property-lead-capture-v1',
  'landlord-property-details',
  'property-info-capture',
  'supply-product-handover',
  'home-visit-feedback',
  'flent-vs-rent',
  'moveout',
  'mygate-referrals',
  'nps-feedback',
  'post-movein-feedback',
  'secured-feedback',
  'unoccupied-invite',
]);

// ── Enum value mappers ───────────────────────────────────────────────
// Form option values → CRM enum values
const GENDER_MAP: Record<string, string> = {
  male: 'MALE',
  female: 'FEMALE',
  others: 'MALE', // CRM only has MALE/FEMALE; default to avoid rejection
};

const DISCOVERY_TO_INQUIRY_CHANNEL: Record<string, string> = {
  instagram: 'INSTAGRAM',
  linkedin: 'WEBSITE',
  google: 'WEBSITE',
  friend: 'REFERRAL',
  broker: 'REFERRAL',
  facebook: 'WEBSITE',
  twitter: 'WEBSITE',
  'olx-nobroker': 'WEBSITE',
  other: 'WEBSITE',
};

const FURNISHING_MAP: Record<string, string> = {
  furnished: 'FULLY_FURNISHED',
  'fully-furnished': 'FULLY_FURNISHED',
  'semi-furnished': 'SEMI_FURNISHED',
  unfurnished: 'UNFURNISHED',
};

// ── Field maps ───────────────────────────────────────────────────────

const TENANT_FIELD_MAP: Record<string, string> = {
  firstName: 'name.firstName',
  lastName: 'name.lastName',
  email: 'email.primaryEmail',
  phone: 'mobilePhone.primaryPhoneNumber',
  company: 'employerName',
  workplace: 'employerName',
  linkedin: 'linkedinUrl.primaryLinkUrl',
  linkedinUrl: 'linkedinUrl.primaryLinkUrl',
  twitterHandle: 'twitterUrl.primaryLinkUrl',
  roomId: 'currentRid',
  role: 'occupation',
  panNumber: 'pan',
  aadhaarNumber: 'aadhaarNumber',
  dateOfBirth: 'dateOfBirth',
  permanentAddress: 'legalAddress',
  gender: 'gender',
  discoverySource: 'firstInquiryChannel',
  moveInDate: 'moveInDate',
};

const MERCHANT_FIELD_MAP: Record<string, string> = {
  firstName: 'name.firstName',
  lastName: 'name.lastName',
  ownerName: 'name.firstName',
  email: 'email.primaryEmail',
  phone: 'phone.primaryPhoneNumber',
  panNumber: 'panNumber',
  beneficiaryName: 'beneficiaryName',
  accountNumber: 'bankAccountNumber',
  ifscCode: 'ifscCode',
  permanentAddress: 'permanentResidential.markdown',
  designation: 'designation',
  organization: 'organization',
};

const PROPERTY_FIELD_MAP: Record<string, string> = {
  pid: 'pid',
  propertyName: 'pid',
  apartmentNumber: 'houseNo',
  floorNumber: 'floor',
  googleMapsLink: 'googleMapLocation.primaryLinkUrl',
  address: 'propertyAddress.markdown',
  localityClusterCode: 'activeCluster',
  numberOfUnits: 'unitsCount',
  furnishingStatus: 'furnishingStatus',
};

const CONTRACT_FIELD_MAP: Record<string, string> = {
  pid: 'pidRef',
  rentStartDate: 'contractStartDate',
  securityDeposit: 'securityDeposit',
  maintenanceAmount: 'maintenanceFee',
  percentageHike: 'incrementPercentage',
  pmCharges: 'managementFeePerMonth',
  baseRent: 'monthlyLicenseFee',
};

const FIELD_MAPS: Record<string, Record<string, string>> = {
  tenants: TENANT_FIELD_MAP,
  merchants: MERCHANT_FIELD_MAP,
  propertyPids: PROPERTY_FIELD_MAP,
  contracts: CONTRACT_FIELD_MAP,
};

// Fields the form collects that don't map to CRM fields — strip before sending
const IGNORED_FIELDS = new Set([
  'hasReferral', 'referralFriendName', 'referralFriendContact', 'voucherCode',
  'consentWebsite', 'consentBgCheck',
  'hubspot_utk', 'hubspot_page_name', 'hubspot_page_url', 'utm_source', 'campaign',
  'aadhaarFront', 'aadhaarBack', 'panCard', 'uanNumber', 'fatherName',
  'age', 'lockInPeriod',
  // File upload fields (not supported via REST yet)
  'ho1_aadhaarFront', 'ho1_aadhaarBack', 'ho1_panUpload', 'ho1_propertyDoc',
  'ho2_aadhaarFront', 'ho2_aadhaarBack', 'ho2_panUpload', 'ho2_propertyDoc',
  'ho3_aadhaarFront', 'ho3_aadhaarBack', 'ho3_panUpload', 'ho3_propertyDoc',
]);

function headers(): Record<string, string> {
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  if (API_KEY) h['Authorization'] = `Bearer ${API_KEY}`;
  return h;
}

// Apply enum value transformations before sending to CRM
function applyEnumMappings(mapped: Record<string, unknown>, objectName: string): void {
  if (objectName === 'tenants') {
    if (mapped['gender'] && typeof mapped['gender'] === 'string') {
      mapped['gender'] = GENDER_MAP[mapped['gender'] as string] || null;
      if (!mapped['gender']) delete mapped['gender'];
    }
    if (mapped['firstInquiryChannel'] && typeof mapped['firstInquiryChannel'] === 'string') {
      mapped['firstInquiryChannel'] = DISCOVERY_TO_INQUIRY_CHANNEL[mapped['firstInquiryChannel'] as string] || 'WEBSITE';
    }
  }
  if (objectName === 'propertyPids') {
    if (mapped['furnishingStatus'] && typeof mapped['furnishingStatus'] === 'string') {
      mapped['furnishingStatus'] = FURNISHING_MAP[mapped['furnishingStatus'] as string] || mapped['furnishingStatus'];
    }
  }
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
  }

  applyEnumMappings(mapped, objectName);

  // Add phone country code defaults for composite phone fields
  if (mapped['mobilePhone']) {
    mapped['mobilePhone'] = {
      primaryPhoneCountryCode: 'IN',
      primaryPhoneCallingCode: '+91',
      ...(mapped['mobilePhone'] as Record<string, unknown>),
    };
  }
  if (mapped['phone'] && typeof mapped['phone'] === 'object') {
    mapped['phone'] = {
      primaryPhoneCountryCode: 'IN',
      primaryPhoneCallingCode: '+91',
      ...(mapped['phone'] as Record<string, unknown>),
    };
  }

  return mapped;
}

// Extract a single homeowner's data from prefixed form fields (ho1_, ho2_, ho3_)
function extractHomeownerMerchant(
  formData: Record<string, unknown>,
  prefix: string,
): Record<string, unknown> | null {
  const firstName = formData[`${prefix}_firstName`];
  if (!firstName) return null;

  const merchant: Record<string, string | unknown> = {};
  merchant.firstName = firstName;
  if (formData[`${prefix}_lastName`]) merchant.lastName = formData[`${prefix}_lastName`];
  if (formData[`${prefix}_phone`]) merchant.phone = formData[`${prefix}_phone`];
  if (formData[`${prefix}_email`]) merchant.email = formData[`${prefix}_email`];
  if (formData[`${prefix}_panNumber`]) merchant.panNumber = formData[`${prefix}_panNumber`];

  // Take bank details from first bank account
  if (formData[`${prefix}_bank1_beneficiary`]) merchant.beneficiaryName = formData[`${prefix}_bank1_beneficiary`];
  if (formData[`${prefix}_bank1_accountNumber`]) merchant.accountNumber = formData[`${prefix}_bank1_accountNumber`];
  if (formData[`${prefix}_bank1_ifsc`]) merchant.ifscCode = formData[`${prefix}_bank1_ifsc`];

  return mapFormDataToCrm(merchant, 'merchants');
}

async function submitMultiRecordForm(
  formId: string,
  formData: Record<string, unknown>,
): Promise<{ success: boolean; submissionId: string }> {
  const results: string[] = [];

  if (formId === 'landlord-onboarding-basic' || formId === 'homeowner-onboarding') {
    const homeownerCount = Number(formData['homeownerCount']) || 1;
    const prefixes = ['ho1', 'ho2', 'ho3'].slice(0, homeownerCount);

    for (const prefix of prefixes) {
      const merchantData = extractHomeownerMerchant(formData, prefix);
      if (!merchantData) continue;
      merchantData['merchantType'] = 'LANDLORD';
      try {
        const result = await hawkeyePost('/merchants', merchantData);
        results.push((result as Record<string, unknown>).id as string || 'created');
      } catch (err) {
        console.error(`[forms] Failed to create merchant for ${prefix}:`, err);
      }
    }

    // Also create POC as a separate merchant if provided
    if (formData['poc_firstName']) {
      const pocData = mapFormDataToCrm({
        firstName: formData['poc_firstName'],
        lastName: formData['poc_lastName'],
        phone: formData['poc_phone'],
        email: formData['poc_email'],
      }, 'merchants');
      pocData['merchantType'] = 'POC';
      try {
        const result = await hawkeyePost('/merchants', pocData);
        results.push((result as Record<string, unknown>).id as string || 'created');
      } catch (err) {
        console.error('[forms] Failed to create POC merchant:', err);
      }
    }
  }

  if (results.length > 0) {
    return { success: true, submissionId: results.join(',') };
  }

  // If no records created, fall back to Notes
  return await submitAsNote(formId, formData);
}

async function submitAsNote(
  formId: string,
  formData: Record<string, unknown>,
): Promise<{ success: boolean; submissionId: string }> {
  if (!API_BASE) return { success: true, submissionId: 'local-preview' };

  // Build a human-readable summary
  const lines: string[] = [];
  for (const [key, value] of Object.entries(formData)) {
    if (key === 'formId') continue;
    if (value === undefined || value === null || value === '') continue;
    if (typeof value === 'object') {
      lines.push(`**${key}:** ${JSON.stringify(value)}`);
    } else {
      lines.push(`**${key}:** ${String(value)}`);
    }
  }

  try {
    await hawkeyePost('/notes', {
      title: `Form: ${formId}`,
      bodyV2: { markdown: lines.join('\n\n') },
    });
    return { success: true, submissionId: 'note-created' };
  } catch {
    return { success: true, submissionId: 'local-preview' };
  }
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
  const { formId: _, ...fields } = formData;

  // Multi-record forms (landlord-onboarding-basic, homeowner-onboarding)
  if (MULTI_RECORD_FORMS.has(formId) && API_BASE) {
    try {
      return await submitMultiRecordForm(formId, fields);
    } catch (err) {
      console.error('[forms] Multi-record submit failed:', err);
    }
  }

  // Notes-only forms (feedback, surveys, scouting, checklists)
  if (NOTES_ONLY_FORMS.has(formId) && API_BASE) {
    return await submitAsNote(formId, fields);
  }

  // Standard single-object forms
  const crmObject = formId ? FORM_TO_CRM_OBJECT[formId] : undefined;
  if (crmObject && API_BASE) {
    const mapped = mapFormDataToCrm(fields, crmObject);
    try {
      const result = await hawkeyePost(`/${crmObject}`, mapped);
      return { success: true, submissionId: (result as Record<string, unknown>).id as string || 'created' };
    } catch (err) {
      console.error('[forms] CRM create failed, falling back to note:', err);
    }
  }

  // Fallback: store as a note
  return await submitAsNote(formId, fields);
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
        bodyV2: { markdown: `Session: ${payload.sessionId}\n\n${JSON.stringify(payload.answer, null, 2)}` },
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
