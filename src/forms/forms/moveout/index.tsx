import { GenericFormPage } from '../GenericFormPage';
import { schema } from './schema';

export default function MoveoutForm() {
  return (
    <GenericFormPage formId="moveout" schema={schema} initialData={{}} />
  );
}
