import { GenericFormPage } from '../GenericFormPage';
import { schema } from './schema';

export default function LandlordOnboardingBasicForm() {
  return <GenericFormPage formId="landlord-onboarding-basic" schema={schema} initialData={{}} />;
}
