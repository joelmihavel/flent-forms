import { GenericFormPage } from '../GenericFormPage';
import { schema } from './schema';

export default function LandlordOnboardingForm() {
  return <GenericFormPage formId="landlord-onboarding" schema={schema} initialData={{}} />;
}
