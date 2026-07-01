import { FormRenderer, createFormStore } from '../../form-engine';
import { homeownerFormSchema } from './schema';
import { homeownerStepMap } from './stepMap';
import {
  createInitialFormData,
  createEmptyHomeowner,
  createEmptyBankAccount,
} from '../../types/form';
import type { FormData, HomeownerData } from '../../types/form';
import type { FormStep } from '../../schema/types';
import WelcomeScreen from '../../components/form/WelcomeScreen';
import SuccessScreen from '../../components/form/SuccessScreen';

function BackgroundLandscape() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '2048 / 768',
        }}
      >
        <img
          src="/forms/cover-bg.png"
          alt=""
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'fill',
            opacity: 0.18,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(252,251,247,1) 0%, rgba(252,251,247,0) 35%)',
          }}
        />
      </div>
    </div>
  );
}

function adjustHomeownerArrays(
  data: Record<string, unknown>,
): Record<string, unknown> {
  const d = data as unknown as FormData;
  const homeownerCount = d.homeownerCount || 1;
  const bankAccountCount = d.bankAccountCount || 1;
  const needsHomeowners = d.homeowners.length !== homeownerCount;
  const needsBanks = d.bankAccounts.length !== bankAccountCount;

  if (!needsHomeowners && !needsBanks) return data;

  const newData = { ...data } as unknown as FormData;
  if (needsHomeowners) {
    const arr = [...newData.homeowners];
    while (arr.length < homeownerCount) arr.push(createEmptyHomeowner());
    if (arr.length > homeownerCount) arr.length = homeownerCount;
    newData.homeowners = arr;
  }
  if (needsBanks) {
    const arr = [...newData.bankAccounts];
    while (arr.length < bankAccountCount) arr.push(createEmptyBankAccount());
    if (arr.length > bankAccountCount) arr.length = bankAccountCount;
    newData.bankAccounts = arr;
  }
  return newData as unknown as Record<string, unknown>;
}

function canProceedHomeowner(
  step: FormStep,
  data: Record<string, unknown>,
  getCurrentItem: () => Record<string, unknown> | null,
): boolean {
  if (step.type === 'welcome' || step.type === 'info-screen') return true;
  if (step.type === 'single-select')
    return !!(data as unknown as FormData).role;
  if (step.type === 'review')
    return !!(data as unknown as FormData).consent;
  if (step.type === 'file-upload') {
    const formData = data as unknown as FormData;
    if (step.id === 'property-document') return !!formData.propertyDocument;
    const ho = getCurrentItem() as HomeownerData | null;
    if (step.id === 'aadhaar-front') return !!ho?.aadhaarFront;
    if (step.id === 'aadhaar-back') return !!ho?.aadhaarBack;
    if (step.id === 'pan-upload') return !!ho?.panCard;
    return true;
  }
  return true;
}

const useHomeownerStore = createFormStore({
  schema: homeownerFormSchema.steps,
  initialData: createInitialFormData() as unknown as Record<string, unknown>,
});

export default function HomeownerForm() {
  const store = useHomeownerStore();

  return (
    <FormRenderer
      schema={homeownerFormSchema.steps}
      store={store}
      onSubmit={async () => {
        // Preview only — no data stored
      }}
      customStepMap={homeownerStepMap}
      adjustArrays={adjustHomeownerArrays}
      welcomeComponent={WelcomeScreen}
      successComponent={SuccessScreen}
      backgroundComponent={BackgroundLandscape}
      canProceedOverride={canProceedHomeowner}
      logoSrc="/forms/flent-wordmark.svg"
    />
  );
}
