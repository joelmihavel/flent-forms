import { GenericFormPage } from '../GenericFormPage';
import { schema } from './schema';

export default function HomeVisitFeedbackForm() {
  return (
    <GenericFormPage
      formId="home-visit-feedback"
      schema={schema}
      initialData={{}}
    />
  );
}
