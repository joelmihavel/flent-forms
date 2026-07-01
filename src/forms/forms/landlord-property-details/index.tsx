import { GenericFormPage } from '../GenericFormPage';
import { schema } from './schema';

export default function LandlordPropertyDetailsForm() {
  return (
    <GenericFormPage
      formId="landlord-property-details"
      schema={schema}
      initialData={{}}
    />
  );
}
