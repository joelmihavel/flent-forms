import { GenericFormPage } from '../GenericFormPage';
import { schema } from './schema';

export default function FlentVsRentForm() {
  return (
    <GenericFormPage
      formId="flent-vs-rent"
      schema={schema}
      initialData={{}}
    />
  );
}
