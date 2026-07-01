import { GenericFormPage } from '../GenericFormPage';
import { schema } from './schema';

export default function SupplyPropertyDetailsForm() {
  return (
    <GenericFormPage
      formId="supply-property-details"
      schema={schema}
      initialData={{}}
    />
  );
}
