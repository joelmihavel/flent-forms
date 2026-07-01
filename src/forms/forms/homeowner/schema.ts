import type { FormSchema } from '../../form-engine/types';
import { onboardingSchema } from '../../schema/onboarding.schema';

export const homeownerFormSchema: FormSchema = {
  id: 'homeowner-onboarding',
  steps: onboardingSchema,
  version: '1.0.0',
};
