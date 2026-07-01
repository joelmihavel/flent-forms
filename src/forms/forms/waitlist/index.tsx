import { GenericFormPage } from '../GenericFormPage';
import { schema } from './schema';

export default function WaitlistForm() {
  return (
    <GenericFormPage formId="waitlist" schema={schema} initialData={{}} />
  );
}
