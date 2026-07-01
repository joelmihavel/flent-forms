import { GenericFormPage } from '../GenericFormPage';
import { schema } from './schema';

export default function UnoccupiedInviteForm() {
  return (
    <GenericFormPage
      formId="unoccupied-invite"
      schema={schema}
      initialData={{}}
    />
  );
}
