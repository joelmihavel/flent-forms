import { useMemo } from 'react';
import type { FormStep } from '../schema/types';
import type { CustomStepProps } from '../form-engine/types';
import { createFormStore } from '../form-engine/store/createFormStore';
import FormRenderer from '../form-engine/core/FormRenderer';
import WelcomeScreen from '../components/form/WelcomeScreen';
import ConfigurableSuccessScreen from '../components/form/ConfigurableSuccessScreen';
import { submitForm, dispatchWebhooks, getHiddenFields, sendStepAnswer } from '../lib/api';

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

  const handleStepComplete = (step: FormStep, stepIndex: number, data: Record<string, unknown>, isLastStep: boolean) => {
    const answer: Record<string, unknown> = {};
    const fieldName = step.meta?.fieldName as string | undefined;

    if (fieldName) {
      answer[fieldName] = data[fieldName];
    }
    if (step.fields) {
      for (const f of step.fields) {
        const val = data[f.name];
        if (val !== undefined) answer[f.name] = val;
      }
    }
    if (step.type === 'file-upload' && fieldName) {
      answer[fieldName] = data[fieldName];
    }
    if (step.type === 'matrix' && fieldName) {
      answer[fieldName] = data[fieldName];
    }
    if (step.type === 'checkbox' && fieldName) {
      answer[fieldName] = data[fieldName];
    }

    sendStepAnswer({
      formId,
      sessionId: store.sessionId,
      stepId: step.id,
      stepIndex,
      stepType: step.type,
      stepTitle: step.title,
      answer,
      allData: data,
      isLastStep,
      timestamp: new Date().toISOString(),
    });
  };

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
      onStepComplete={handleStepComplete}
      logoSrc="/forms/flent-wordmark.svg"
    />
  );
}
