import { GenericFormPage } from '../GenericFormPage';
import { schema } from './schema';

export default function PropertyInfoCaptureForm() {
  return (
    <GenericFormPage
      formId="property-info-capture"
      schema={schema}
      initialData={{}}
    />
  );
}
