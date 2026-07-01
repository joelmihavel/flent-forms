

import type { CustomStepProps } from '../../form-engine/types';
import type { HomeownerData, FormData } from '../../types/form';
import PANInput from '../../components/form/PANInput';
import BankFields from '../../components/form/BankFields';
import FileUpload from '../../components/form/FileUpload';
import ReviewScreen from '../../components/form/ReviewScreen';
import type { UploadedFile } from '../../types/form';

function PANStep({ step, errors, getCurrentItem, setField, getFieldPath, onNext }: CustomStepProps) {
  const ho = getCurrentItem() as HomeownerData | null;
  return (
    <PANInput
      value={ho?.pan || ''}
      verified={ho?.panVerified || false}
      panName={ho?.panName || ''}
      onChange={(v) => setField(getFieldPath('pan'), v)}
      onVerified={(name) => {
        setField(getFieldPath('panVerified'), true);
        setField(getFieldPath('panName'), name);
      }}
      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onNext(); } }}
      error={errors.pan}
    />
  );
}

function BankDetailsStep({ step, values, errors, setFieldValue, onNext }: CustomStepProps) {
  return (
    <BankFields
      fields={step.fields || []}
      values={values}
      errors={errors}
      onChange={setFieldValue}
      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onNext(); } }}
    />
  );
}

function PropertyDocumentStep({ step, data, setField }: CustomStepProps) {
  const formData = data as unknown as FormData;
  return (
    <FileUpload
      config={step.fileUpload!}
      value={formData.propertyDocument || null}
      onChange={(file) => setField('propertyDocument', file)}
    />
  );
}

function AadhaarFrontStep({ step, getCurrentItem, setField, getFieldPath }: CustomStepProps) {
  const ho = getCurrentItem() as HomeownerData | null;
  return (
    <FileUpload
      config={step.fileUpload!}
      value={ho?.aadhaarFront || null}
      onChange={(file) => setField(getFieldPath('aadhaarFront'), file)}
      onOCR={(result) => {
        if (result.name) {
          const parts = result.name.split(' ');
          if (parts.length >= 2) {
            setField(getFieldPath('firstName'), parts[0]);
            setField(getFieldPath('lastName'), parts.slice(1).join(' '));
          }
        }
        setField(getFieldPath('aadhaarOCR'), result);
      }}
    />
  );
}

function AadhaarBackStep({ step, getCurrentItem, setField, getFieldPath }: CustomStepProps) {
  const ho = getCurrentItem() as HomeownerData | null;
  return (
    <FileUpload
      config={step.fileUpload!}
      value={ho?.aadhaarBack || null}
      onChange={(file) => setField(getFieldPath('aadhaarBack'), file)}
      onOCR={(result) => {
        setField(getFieldPath('aadhaarOCR'), result);
      }}
    />
  );
}

function PANUploadStep({ step, getCurrentItem, setField, getFieldPath }: CustomStepProps) {
  const ho = getCurrentItem() as HomeownerData | null;
  return (
    <FileUpload
      config={step.fileUpload!}
      value={ho?.panCard || null}
      onChange={(file) => setField(getFieldPath('panCard'), file)}
    />
  );
}

function ReviewStep({ data, setField }: CustomStepProps) {
  const formData = data as unknown as FormData;
  return (
    <ReviewScreen
      data={formData}
      consent={formData.consent}
      onConsentChange={(v) => setField('consent', v)}
      onEdit={() => {}}
    />
  );
}

export const homeownerStepMap: Record<string, React.ComponentType<CustomStepProps>> = {
  'pan-input': PANStep,
  'bank-details': BankDetailsStep,
  'property-document': PropertyDocumentStep,
  'aadhaar-front': AadhaarFrontStep,
  'aadhaar-back': AadhaarBackStep,
  'pan-upload': PANUploadStep,
  'review': ReviewStep,
};
