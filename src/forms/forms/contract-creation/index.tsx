import { GenericFormPage } from '../GenericFormPage';
import { schema } from './schema';

export default function ContractCreationForm() {
  return (
    <GenericFormPage
      formId="contract-creation"
      schema={schema}
      initialData={{}}
    />
  );
}
