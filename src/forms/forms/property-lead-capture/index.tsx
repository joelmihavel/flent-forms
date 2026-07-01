import { GenericFormPage } from '../GenericFormPage';
import { schema } from './schema';

export default function PropertyLeadCaptureForm() {
  return (
    <GenericFormPage
      formId="property-lead-capture"
      schema={schema}
      initialData={{}}
    />
  );
}
