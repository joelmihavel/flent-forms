import { GenericFormPage } from '../GenericFormPage';
import { schema } from './schema';

export default function MyGateReferralsForm() {
  return (
    <GenericFormPage
      formId="mygate-referrals"
      schema={schema}
      initialData={{}}
    />
  );
}
