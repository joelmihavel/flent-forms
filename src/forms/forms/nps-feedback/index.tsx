import { GenericFormPage } from '../GenericFormPage';
import { schema } from './schema';

export default function NpsFeedbackForm() {
  return <GenericFormPage formId="nps-feedback" schema={schema} initialData={{}} />;
}
