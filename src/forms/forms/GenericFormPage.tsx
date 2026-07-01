import { useMemo } from 'react';
import type { FormStep } from '../schema/types';
import type { CustomStepProps } from '../form-engine/types';
import { createFormStore } from '../form-engine/store/createFormStore';
import FormRenderer from '../form-engine/core/FormRenderer';
import WelcomeScreen from '../components/form/WelcomeScreen';
import ConfigurableSuccessScreen from '../components/form/ConfigurableSuccessScreen';
import { submitForm, dispatchWebhooks, getHiddenFields } from '../lib/api';

interface GenericFormPageProps {
  formId: string;
  schema: FormStep[];
  initialData?: Record<string, unknown>;
  customStepMap?: Record<string, React.ComponentType<CustomStepProps>>;
  adjustArrays?: (data: Record<string, unknown>) => Record<string, unknown>;
  canProceedOverride?: (step: FormStep, data: Record<string, unknown>, getCurrentItem: () => Record<string, unknown> | null) => boolean;
}

export function GenericFormPage({
  formId,
  schema,
  initialData,
  customStepMap,
  adjustArrays,
  canProceedOverride,
}: GenericFormPageProps) {
  const welcomeStep = schema.find((s) => s.type === 'welcome');
  const meta = welcomeStep?.meta ?? schema[0]?.meta;

  const useStore = useMemo(() => {
    const hiddenFields = getHiddenFields(meta?.hiddenFields);
    return createFormStore({
      schema,
      initialData: { ...initialData, ...hiddenFields },
      persistKey: `form-${formId}`,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const store = useStore();

  const handleSubmit = async (data: Record<string, unknown>) => {
    await submitForm({ formId, ...data });
    if (meta?.webhooks) {
      await dispatchWebhooks(meta.webhooks, data);
    }
  };

  const SuccessComponent = useMemo(() => {
    const title = meta?.successTitle;
    const subtitle = meta?.successSubtitle;
    const ctaLabel = meta?.successCtaLabel;
    const ctaUrl = meta?.successCtaUrl;
    return () => (
      <ConfigurableSuccessScreen
        title={title as string}
        subtitle={subtitle as string}
        ctaLabel={ctaLabel as string}
        ctaUrl={ctaUrl as string}
      />
    );
  }, [meta]);

  return (
    <FormRenderer
      schema={schema}
      store={store}
      onSubmit={handleSubmit}
      customStepMap={customStepMap}
      adjustArrays={adjustArrays}
      welcomeComponent={WelcomeScreen}
      successComponent={SuccessComponent}
      canProceedOverride={canProceedOverride}
      logoSrc="/forms/flent-wordmark.svg"
    />
  );
}
