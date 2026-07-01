import { GenericFormPage } from '../GenericFormPage';
import { schema } from './schema';

export default function LandlordInboundForm() {
  return (
    <GenericFormPage
      formId="landlord-inbound"
      schema={schema}
      initialData={{}}
    />
  );
}
