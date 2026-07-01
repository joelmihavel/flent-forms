import { lazy, Suspense, useEffect, useMemo, useState, type ComponentType } from 'react';
import {
  IconCalendar,
  IconCheck,
  IconCheckbox,
  IconClick,
  IconFileUpload,
  IconHandClick,
  IconInfoCircle,
  IconList,
  IconListCheck,
  IconMoodSmile,
  IconNumber,
  IconPhone,
  IconRocket,
  IconStar,
  IconTextCaption,
  IconX,
} from '@tabler/icons-react';

import type { FormEntry } from './formRegistry';
import type { FormStep } from './schema/types';
import './forms.css';

const STEP_TYPE_ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  welcome: IconRocket,
  'single-select': IconClick,
  'multi-select': IconCheckbox,
  'number-picker': IconNumber,
  'field-group': IconTextCaption,
  'file-upload': IconFileUpload,
  'text-input': IconTextCaption,
  'long-text': IconTextCaption,
  'info-screen': IconInfoCircle,
  review: IconListCheck,
  rating: IconStar,
  nps: IconMoodSmile,
  'opinion-scale': IconMoodSmile,
  'yes-no': IconHandClick,
  dropdown: IconList,
  date: IconCalendar,
  matrix: IconListCheck,
  phone: IconPhone,
  checkbox: IconCheckbox,
};

const formComponents: Record<
  string,
  React.LazyExoticComponent<React.ComponentType>
> = {
  'homeowner-onboarding': lazy(() => import('./forms/homeowner/index')),
  'landlord-onboarding-basic': lazy(() => import('./forms/landlord-onboarding-basic/index')),
  'landlord-onboarding': lazy(() => import('./forms/landlord-onboarding/index')),
  'nps-feedback': lazy(() => import('./forms/nps-feedback/index')),
  'secured-feedback': lazy(() => import('./forms/secured-feedback/index')),
  'home-visit-feedback': lazy(() => import('./forms/home-visit-feedback/index')),
  'post-movein-feedback': lazy(() => import('./forms/post-movein-feedback/index')),
  'tenant-onboarding': lazy(() => import('./forms/tenant-onboarding/index')),
  'landlord-inbound': lazy(() => import('./forms/landlord-inbound/index')),
  'landlord-property-details': lazy(() => import('./forms/landlord-property-details/index')),
  'supply-property-details': lazy(() => import('./forms/supply-property-details/index')),
  'supply-product-handover': lazy(() => import('./forms/supply-product-handover/index')),
  'property-info-capture': lazy(() => import('./forms/property-info-capture/index')),
  'property-lead-capture': lazy(() => import('./forms/property-lead-capture/index')),
  'property-lead-capture-v1': lazy(() => import('./forms/property-lead-capture-v1/index')),
  'contract-creation': lazy(() => import('./forms/contract-creation/index')),
  'mygate-referrals': lazy(() => import('./forms/mygate-referrals/index')),
  'flent-vs-rent': lazy(() => import('./forms/flent-vs-rent/index')),
  'waitlist': lazy(() => import('./forms/waitlist/index')),
  'unoccupied-invite': lazy(() => import('./forms/unoccupied-invite/index')),
  'moveout': lazy(() => import('./forms/moveout/index')),
  'reserve-intent': lazy(() => import('./forms/reserve-intent/index')),
};

type FormPreviewModalProps = {
  form: FormEntry;
  onClose: () => void;
};

export const FormPreviewModal = ({ form, onClose }: FormPreviewModalProps) => {
  const FormComponent = formComponents[form.id];
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (typeof detail === 'object' && detail !== null) {
        setActiveStep(detail.index);
        setIsSubmitted(detail.submitted);
      } else {
        setActiveStep(detail);
        setIsSubmitted(false);
      }
    };
    window.addEventListener('form-step-changed', handler);
    return () => window.removeEventListener('form-step-changed', handler);
  }, []);

  const handleStepClick = (index: number) => {
    window.dispatchEvent(
      new CustomEvent('form-navigate-to-step', { detail: index }),
    );
  };

  const handleSuccessClick = () => {
    window.dispatchEvent(new CustomEvent('form-preview-success'));
  };

  const stepSummary = useMemo(() => {
    const fieldCount = form.steps.reduce(
      (acc: number, step: FormStep) => acc + (step.fields?.length ?? 0),
      0,
    );
    const uploadCount = form.steps.filter(
      (step: FormStep) => step.type === 'file-upload',
    ).length;
    return { fieldCount, uploadCount };
  }, [form.steps]);

  const welcomeStep = form.steps.find((s: FormStep) => s.type === 'welcome');
  const questionSteps = form.steps.filter(
    (s: FormStep) => s.type !== 'welcome',
  );
  let questionNumber = 0;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: '#fff',
        }}
      >
        {/* Left Panel */}
        <div style={{
          width: 260,
          minWidth: 260,
          borderRight: '1px solid #e0e0e0',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: '#fff',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 16px',
            borderBottom: '1px solid #f0f0f0',
            flexShrink: 0,
          }}>
            <h2 style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#1a1a1a',
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {form.name}
            </h2>
            <button
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 28,
                height: 28,
                border: '1px solid #e0e0e0',
                borderRadius: 4,
                background: '#fff',
                cursor: 'pointer',
                color: '#999',
                flexShrink: 0,
              }}
            >
              <IconX size={14} />
            </button>
          </div>

          {/* Step List */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '6px 8px' }}>
            {welcomeStep && (
              <>
                <div style={sectionLabelStyle}>Welcome</div>
                <StepItem
                  active={activeStep === 0 && !isSubmitted}
                  onClick={() => handleStepClick(0)}
                  icon={<IconRocket size={14} />}
                  label={welcomeStep.title}
                />
              </>
            )}

            <div style={sectionLabelStyle}>Questions</div>
            {questionSteps.map((step: FormStep) => {
              const originalIndex = form.steps.indexOf(step);
              const isActive = originalIndex === activeStep && !isSubmitted;
              const StepIcon = STEP_TYPE_ICONS[step.type] ?? IconCheck;
              const isInfoScreen = step.type === 'info-screen';

              if (isInfoScreen) {
                return (
                  <div key={step.id} style={sectionLabelStyle}>
                    {step.title}
                  </div>
                );
              }

              questionNumber++;

              return (
                <StepItem
                  key={step.id}
                  active={isActive}
                  onClick={() => handleStepClick(originalIndex)}
                  icon={<StepIcon size={14} />}
                  number={questionNumber}
                  label={step.title}
                />
              );
            })}

            <div style={sectionLabelStyle}>Endings</div>
            <StepItem
              active={isSubmitted}
              onClick={handleSuccessClick}
              icon={<IconCheck size={14} />}
              label={(welcomeStep?.meta?.successTitle as string) || "You're all set!"}
            />
          </div>

          {/* Footer */}
          <div style={{
            padding: '10px 16px',
            borderTop: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            flexShrink: 0,
            background: '#fafafa',
          }}>
            <span style={{ fontSize: 11, color: '#999' }}>
              <strong style={{ color: '#666', fontWeight: 600 }}>{form.steps.length}</strong> steps
            </span>
            <span style={{ fontSize: 11, color: '#999' }}>
              <strong style={{ color: '#666', fontWeight: 600 }}>{stepSummary.fieldCount}</strong> fields
            </span>
            {stepSummary.uploadCount > 0 && (
              <span style={{ fontSize: 11, color: '#999' }}>
                <strong style={{ color: '#666', fontWeight: 600 }}>{stepSummary.uploadCount}</strong> uploads
              </span>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div style={{
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
          background: '#fcfbf7',
          clipPath: 'inset(0)',
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            position: 'relative',
          }}>
            {FormComponent ? (
              <Suspense
                fallback={
                  <div style={loadingStyle}>Loading form preview...</div>
                }
              >
                <FormComponent />
              </Suspense>
            ) : (
              <div style={loadingStyle}>
                No preview available for this form.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const sectionLabelStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 600,
  color: '#b0b0b0',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
  padding: '12px 10px 4px',
};

const loadingStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  color: '#999',
  fontSize: 13,
};

function StepItem({
  active,
  onClick,
  icon,
  number,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  number?: number;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        width: '100%',
        padding: '8px 10px',
        border: 'none',
        borderRadius: 4,
        background: active ? '#f0f0f0' : 'transparent',
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'inherit',
        transition: 'background 0.12s ease',
      }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = '#f8f8f8'; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        borderRadius: 6,
        flexShrink: 0,
        color: active ? '#1971c2' : '#999',
        background: active ? '#e7f0ff' : 'transparent',
      }}>
        {icon}
      </div>
      {number !== undefined && (
        <span style={{
          fontSize: 11,
          fontWeight: 600,
          color: active ? '#1971c2' : '#ccc',
          minWidth: 14,
          textAlign: 'center',
        }}>
          {number}
        </span>
      )}
      <span style={{
        fontSize: 13,
        fontWeight: active ? 500 : 400,
        color: active ? '#1a1a1a' : '#666',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: 1.3,
      }}>
        {label}
      </span>
    </button>
  );
}
