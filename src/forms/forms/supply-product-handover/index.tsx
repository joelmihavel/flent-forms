import { GenericFormPage } from '../GenericFormPage';
import { schema } from './schema';

export default function SupplyProductHandoverForm() {
  return (
    <GenericFormPage
      formId="supply-product-handover"
      schema={schema}
      initialData={{}}
    />
  );
}
