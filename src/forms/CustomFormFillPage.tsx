import { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getCustomForms } from './builder/store/builderStore';
import { GenericFormPage } from './forms/GenericFormPage';

export function CustomFormFillPage() {
  const { formId } = useParams<{ formId: string }>();
  const fullId = `custom_${formId}`;

  const form = useMemo(() => {
    return getCustomForms().find(f => f.id === fullId);
  }, [fullId]);

  if (!form) {
    return <Navigate to="/" replace />;
  }

  return (
    <GenericFormPage
      formId={form.id}
      schema={form.steps}
    />
  );
}
