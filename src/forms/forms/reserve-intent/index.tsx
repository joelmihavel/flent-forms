import { GenericFormPage } from '../GenericFormPage';
import { schema } from './schema';

export default function ReserveIntentForm() {
  return (
    <GenericFormPage
      formId="reserve-intent"
      schema={schema}
      initialData={{}}
    />
  );
}
