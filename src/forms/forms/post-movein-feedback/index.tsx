import { GenericFormPage } from '../GenericFormPage';
import { schema } from './schema';

export default function PostMoveinFeedbackForm() {
  return (
    <GenericFormPage
      formId="post-movein-feedback"
      schema={schema}
      initialData={{}}
    />
  );
}
