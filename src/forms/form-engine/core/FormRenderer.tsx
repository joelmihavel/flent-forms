

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FormStep } from '../../schema/types';
import { COLORS } from '../../lib/constants';
import type { CustomStepProps } from '../types';
import type { FormStoreState } from '../store/createFormStore';
import { useFormEngine } from '../hooks/useFormEngine';
import { useAutosave } from '../hooks/useAutosave';
import StepRenderer from './StepRenderer';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';

const slideVariants = {
  enter: (dir: number) => ({
    y: dir > 0 ? '50vh' : '-50vh',
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    y: dir > 0 ? '-50vh' : '50vh',
    opacity: 0,
  }),
};

interface FormRendererProps {
  schema: FormStep[];
  store: FormStoreState;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  onSaveDraft?: (data: Record<string, unknown>) => Promise<void>;
  customStepMap?: Record<string, React.ComponentType<CustomStepProps>>;
  adjustArrays?: (data: Record<string, unknown>) => Record<string, unknown>;
  welcomeComponent?: React.ComponentType<{ step: FormStep; onNext: () => void }>;
  successComponent?: React.ComponentType;
  backgroundComponent?: React.ComponentType;
  canProceedOverride?: (step: FormStep, data: Record<string, unknown>, getCurrentItem: () => Record<string, unknown> | null) => boolean;
  onStepComplete?: (step: FormStep, stepIndex: number, data: Record<string, unknown>, isLastStep: boolean) => void;
  logoSrc?: string;
}

export default function FormRenderer({
  schema,
  store,
  onSubmit,
  onSaveDraft,
  customStepMap,
  adjustArrays,
  welcomeComponent: WelcomeComponent,
  successComponent: SuccessComponent,
  backgroundComponent: BackgroundComponent,
  canProceedOverride,
  onStepComplete,
  logoSrc = '/flent-wordmark.svg',
}: FormRendererProps) {
  const engine = useFormEngine({ schema, store });
  const {
    step,
    currentStepIndex,
    repeatableIndex,
    direction,
    data,
    errors,
    effectiveSteps,
    effectiveCurrent,
    getRepeatableLabel,
    getFieldPath,
    getFieldValue,
    setFieldValue,
    getCurrentItem,
    getValues,
    validateCurrentStep,
  } = engine;

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const interpolate = useCallback((text: string | undefined): string => {
    if (!text) return '';
    return text.replace(/\{\{field:([^}]+)\}\}/g, (_, fieldId: string) => {
      const val = (data as Record<string, unknown>)[fieldId];
      if (val && typeof val === 'string') return val;
      if (val && typeof val === 'number') return String(val);
      return '';
    }).replace(/\{\{hidden:([^}]+)\}\}/g, (_, key: string) => {
      const params = new URLSearchParams(window.location.search);
      return params.get(key) || '';
    });
  }, [data]);

  useEffect(() => {
    if (!adjustArrays) return;
    const adjusted = adjustArrays(data);
    if (adjusted !== data) {
      store.setData(adjusted);
    }
  }); // eslint-disable-line react-hooks/exhaustive-deps

  useAutosave({
    data,
    currentStepIndex,
    onSave: onSaveDraft || (async () => {}),
    debounceMs: onSaveDraft ? 2000 : 999999999,
  });

  const handleSubmitForm = async () => {
    setSubmitting(true);
    setSubmitError('');
    try {
      await onSubmit(data);
      store.setSubmitted(true);
    } catch {
      setSubmitError('Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const fireStepComplete = useCallback((isLast: boolean) => {
    if (onStepComplete) {
      onStepComplete(step, currentStepIndex, data, isLast);
    }
  }, [onStepComplete, step, currentStepIndex, data]);

  const handleNext = useCallback(() => {
    if (step.type === 'welcome' || step.type === 'info-screen') {
      fireStepComplete(false);
      store.nextStep();
      return;
    }
    if (step.type === 'single-select' || step.type === 'yes-no') {
      const selectField = (step.meta?.fieldName as string) || (step.type === 'yes-no' ? step.fields?.[0]?.name || step.id : 'role');
      const selectValue = (data as Record<string, unknown>)[selectField];
      if (!selectValue) return;
      fireStepComplete(false);
      if (step.nextOverride && step.nextOverride[selectValue as string]) {
        const targetId = step.nextOverride[selectValue as string];
        const targetIdx = schema.findIndex(s => s.id === targetId);
        if (targetIdx >= 0) { store.goToStep(targetIdx); return; }
      }
      store.nextStep();
      return;
    }
    if (step.type === 'review') {
      const consent = (data as Record<string, unknown>).consent;
      if (!consent) {
        store.setErrors({ consent: 'Please confirm your details' });
        return;
      }
      fireStepComplete(true);
      handleSubmitForm();
      return;
    }
    if (!validateCurrentStep()) return;
    const isLast = effectiveCurrent >= effectiveSteps;
    fireStepComplete(isLast);
    if (isLast) {
      handleSubmitForm();
      return;
    }
    store.nextStep();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, currentStepIndex, repeatableIndex, data, errors, effectiveCurrent, effectiveSteps, fireStepComplete]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      const active = document.activeElement;
      if (active?.tagName === 'TEXTAREA') return;
      if (active?.tagName === 'BUTTON') return;
      e.preventDefault();
      handleNext();
    }
  }, [handleNext]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const navHandler = (e: Event) => {
      const idx = (e as CustomEvent<number>).detail;
      if (typeof idx === 'number' && idx >= 0 && idx < schema.length) {
        if (store.submitted) store.setSubmitted(false);
        store.goToStep(idx);
      }
    };
    const successHandler = () => {
      store.setSubmitted(true);
    };
    window.addEventListener('form-navigate-to-step', navHandler);
    window.addEventListener('form-preview-success', successHandler);
    return () => {
      window.removeEventListener('form-navigate-to-step', navHandler);
      window.removeEventListener('form-preview-success', successHandler);
    };
  }, [schema.length, store]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('form-step-changed', {
        detail: { index: currentStepIndex, submitted: store.submitted },
      }),
    );
  }, [currentStepIndex, store.submitted]);

  if (store.submitted) {
    if (SuccessComponent) return <SuccessComponent />;
    return <div style={{ padding: 48, textAlign: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Form submitted successfully!</div>;
  }

  const canProceed = () => {
    if (canProceedOverride) {
      return canProceedOverride(step, data, getCurrentItem);
    }
    if (step.type === 'welcome' || step.type === 'info-screen') return true;
    if (step.type === 'single-select') {
      const sf = (step.meta?.fieldName as string) || 'role';
      return !!(data as Record<string, unknown>)[sf];
    }
    if (step.type === 'review') return !!(data as Record<string, unknown>).consent;

    const fn = (step.meta?.fieldName as string) || step.fields?.[0]?.name || step.id;
    const val = (data as Record<string, unknown>)[fn];

    if (step.type === 'rating' || step.type === 'nps' || step.type === 'opinion-scale') {
      return val !== undefined && val !== null && val !== 0;
    }
    if (step.type === 'yes-no' || step.type === 'dropdown' || step.type === 'date') {
      return !!val;
    }
    if (step.type === 'multi-select') {
      return Array.isArray(val) && val.length > 0;
    }
    if (step.type === 'checkbox') {
      const items = step.checkboxItems || [];
      return Array.isArray(val) && val.length === items.length;
    }
    if (step.type === 'long-text' || step.type === 'phone') {
      return !!val && String(val).trim().length > 0;
    }
    if (step.type === 'text-input' && !step.fields?.length) {
      return !!val && String(val).trim().length > 0;
    }
    return true;
  };

  if (step.type === 'welcome' && WelcomeComponent) {
    return <WelcomeComponent step={step} onNext={() => store.nextStep()} />;
  }

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = step.type === 'review' || effectiveCurrent >= effectiveSteps;

  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'row',
      background: COLORS.bg,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      {BackgroundComponent && <BackgroundComponent />}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(16px, 3vw, 24px) clamp(24px, 5vw, 48px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <img src={logoSrc} alt="flent" width={56} height={20} style={{ objectFit: 'contain' }} />
          <span style={{ fontSize: 12, fontWeight: 500, color: COLORS.subtle }}>
            {effectiveCurrent} of {effectiveSteps}
          </span>
        </div>

        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: step.type === 'review' ? 'flex-start' : 'center',
          padding: 'clamp(32px, 6vw, 56px) clamp(24px, 5vw, 48px)',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
        }}>
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={`${step.id}-${repeatableIndex}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ width: '100%', maxWidth: 520, margin: '0 auto', willChange: 'transform, opacity' }}
            >
              {!isFirstStep && (
                <motion.button
                  onClick={() => store.prevStep()}
                  whileHover={{ x: -3 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: 0,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 500,
                    color: COLORS.primary,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    marginBottom: 20,
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M11 5L7 9L11 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Back
                </motion.button>
              )}

              {step.type === 'info-screen' ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{
                    width: 80,
                    height: 80,
                    borderRadius: 24,
                    background: COLORS.pastelViolet,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 36,
                    marginBottom: 28,
                  }}>
                    {step.meta?.icon as string || '📋'}
                  </div>

                  <h2 style={{
                    fontSize: 'clamp(28px, 6vw, 40px)',
                    fontWeight: 500,
                    color: COLORS.text,
                    margin: '0 0 12px',
                    lineHeight: 1.1,
                    fontFamily: "'Zin Display Condensed', 'Plus Jakarta Sans', sans-serif",
                  }}>
                    {interpolate(step.title)}
                  </h2>

                  <p style={{
                    fontSize: 'clamp(14px, 2.5vw, 16px)',
                    color: COLORS.muted,
                    margin: 0,
                    lineHeight: 1.6,
                    maxWidth: 380,
                  }}>
                    {interpolate(step.subtitle)}
                  </p>
                </div>
              ) : (
                <>
                  <div style={{
                    fontSize: 'clamp(48px, 10vw, 72px)',
                    fontWeight: 600,
                    fontFamily: "'Zin Display Condensed', 'Plus Jakarta Sans', sans-serif",
                    color: 'rgba(0,142,117,0.08)',
                    lineHeight: 1,
                    marginBottom: -8,
                    userSelect: 'none',
                  }}>
                    ({String(effectiveCurrent).padStart(2, '0')})
                  </div>

                  {step.repeatable && (
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      color: COLORS.primary,
                      marginBottom: 8,
                      marginTop: 8,
                    }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: COLORS.primary }} />
                      {getRepeatableLabel()}
                    </div>
                  )}

                  <h2 style={{
                    fontSize: 'clamp(28px, 6vw, 42px)',
                    fontWeight: 500,
                    color: COLORS.text,
                    margin: 0,
                    lineHeight: 1.08,
                    fontFamily: "'Zin Display Condensed', 'Plus Jakarta Sans', sans-serif",
                    letterSpacing: '-0.01em',
                  }}>
                    {interpolate(step.title)}
                  </h2>

                  {step.subtitle && (
                    <p style={{
                      fontSize: 'clamp(14px, 2.5vw, 16px)',
                      color: COLORS.muted,
                      marginTop: 14,
                      marginBottom: 0,
                      lineHeight: 1.65,
                      maxWidth: 440,
                    }}>
                      {interpolate(step.subtitle)}
                    </p>
                  )}

                  <div style={{ marginTop: 'clamp(28px, 5vw, 40px)' }}>
                    <StepRenderer
                      step={step}
                      data={data}
                      errors={errors}
                      values={getValues()}
                      getFieldValue={getFieldValue}
                      setFieldValue={setFieldValue}
                      setField={store.setField}
                      onNext={handleNext}
                      repeatableIndex={repeatableIndex}
                      getCurrentItem={getCurrentItem}
                      getFieldPath={getFieldPath}
                      customStepMap={customStepMap}
                    />
                  </div>
                </>
              )}

              {submitError && (
                <div style={{ marginTop: 16 }}>
                  <Alert type="error" title="Submission Failed" message={submitError} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(16px, 3vw, 24px) clamp(24px, 5vw, 48px)',
          paddingBottom: 'calc(clamp(20px, 4vw, 32px) + env(safe-area-inset-bottom, 0px))',
          maxWidth: 568,
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}>
          <div style={{ flex: 1 }}>
            <Button
              variant={isLastStep ? 'cta' : 'primary'}
              label={isLastStep ? 'Submit' : 'Continue →'}
              onClick={handleNext}
              fullWidth
              size="lg"
              loading={submitting}
              disabled={!canProceed()}
            />
          </div>
          <span style={{ fontSize: 12, color: COLORS.subtle, whiteSpace: 'nowrap', flexShrink: 0 }}>
            <span style={{ fontWeight: 600, color: COLORS.muted }}>↵</span> Enter
          </span>
        </div>
      </div>

      <div style={{
        position: 'relative',
        zIndex: 1,
        width: 48,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 0',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          height: 'min(50vh, 280px)',
        }}>
          {Array.from({ length: effectiveSteps }, (_, i) => (
            <motion.div
              key={i}
              animate={{
                background: i < effectiveCurrent ? COLORS.text : COLORS.border,
              }}
              transition={{ duration: 0.3 }}
              style={{
                flex: 1,
                width: 3,
                borderRadius: 2,
                minHeight: 2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
