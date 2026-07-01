import { GenericFormPage } from '../GenericFormPage';
import { schema } from './schema';

export default function TenantOnboardingForm() {
  return (
    <GenericFormPage
      formId="tenant-onboarding"
      schema={schema}
      initialData={{}}
    />
  );
}
