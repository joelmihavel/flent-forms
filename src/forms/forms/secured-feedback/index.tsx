import { GenericFormPage } from '../GenericFormPage';
import { schema } from './schema';

export default function SecuredFeedbackForm() {
  return (
    <GenericFormPage
      formId="secured-feedback"
      schema={schema}
      initialData={{}}
    />
  );
}
