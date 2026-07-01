import {
  IconCalendar,
  IconCheckbox,
  IconClick,
  IconFileUpload,
  IconHandClick,
  IconHash,
  IconInfoCircle,
  IconList,
  IconListCheck,
  IconMoodSmile,
  IconNotes,
  IconPhone,
  IconRocket,
  IconStar,
  IconTextCaption,
} from '@tabler/icons-react';
import type { FormStep } from '../../schema/types';
import { useBuilderStore } from '../store/builderStore';

export function StepPreview() {
  const { steps, selectedStepIndex } = useBuilderStore();

  if (selectedStepIndex === null || !steps[selectedStepIndex]) {
    return (
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: '#fcfbf7', color: '#999', fontSize: 14,
        gap: 12,
      }}>
        <div style={{ fontSize: 40, opacity: 0.3 }}>📝</div>
        <div>Select a step to preview, or add one to get started.</div>
      </div>
    );
  }

  const step = steps[selectedStepIndex];

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: '#fcfbf7', overflow: 'auto',
    }}>
      <div style={{
        padding: '12px 24px',
        borderBottom: '1px solid #eee',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexShrink: 0,
        background: '#fff',
      }}>
        <div style={{
          fontSize: 11, fontWeight: 500, color: '#999',
          background: '#f0f0f0', borderRadius: 4, padding: '2px 8px',
        }}>
          Preview
        </div>
        <span style={{ fontSize: 12, color: '#bbb' }}>
          Step {selectedStepIndex + 1} of {steps.length}
        </span>
      </div>

      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '48px 24px',
      }}>
        <div style={{
          width: '100%', maxWidth: 520, margin: '0 auto',
        }}>
          {step.type === 'welcome' ? (
            <WelcomePreview step={step} />
          ) : step.type === 'info-screen' ? (
            <InfoPreview step={step} />
          ) : (
            <QuestionPreview step={step} index={selectedStepIndex} totalVisible={steps.length} />
          )}
        </div>
      </div>
    </div>
  );
}

function WelcomePreview({ step }: { step: FormStep }) {
  return (
    <div style={{ textAlign: 'center' }}>
      {step.meta?.overline && (
        <div style={{
          fontSize: 11, fontWeight: 600, color: '#008E75',
          textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12,
        }}>
          {step.meta.overline as string}
        </div>
      )}
      <h1 style={{
        fontSize: 42, fontWeight: 500, color: '#1a1a1a',
        fontFamily: "'Zin Display Condensed', 'Plus Jakarta Sans', sans-serif",
        lineHeight: 1.08, margin: '0 0 16px',
      }}>
        {step.title || 'Welcome!'}
      </h1>
      {step.subtitle && (
        <p style={{ fontSize: 16, color: '#666', lineHeight: 1.6, margin: '0 0 32px' }}>
          {step.subtitle}
        </p>
      )}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '12px 32px', borderRadius: 8,
        background: '#008E75', color: '#fff',
        fontSize: 15, fontWeight: 600,
      }}>
        {(step.meta?.ctaLabel as string) || 'Get Started'} →
      </div>
      {step.meta?.estimatedTime && (
        <div style={{ fontSize: 12, color: '#999', marginTop: 16 }}>
          ⏱ {step.meta.estimatedTime as string}
        </div>
      )}
    </div>
  );
}

function InfoPreview({ step }: { step: FormStep }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: 80, height: 80, borderRadius: 24,
        background: '#ece4f4', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        fontSize: 36, margin: '0 auto 28px',
      }}>
        {(step.meta?.icon as string) || '📋'}
      </div>
      <h2 style={{
        fontSize: 36, fontWeight: 500, color: '#1a1a1a',
        fontFamily: "'Zin Display Condensed', 'Plus Jakarta Sans', sans-serif",
        lineHeight: 1.1, margin: '0 0 12px',
      }}>
        {step.title || 'Information'}
      </h2>
      {step.subtitle && (
        <p style={{ fontSize: 15, color: '#666', lineHeight: 1.6, margin: 0, maxWidth: 380, marginInline: 'auto' }}>
          {step.subtitle}
        </p>
      )}
    </div>
  );
}

function QuestionPreview({ step, index, totalVisible }: { step: FormStep; index: number; totalVisible: number }) {
  return (
    <>
      <div style={{
        fontSize: 64, fontWeight: 600,
        fontFamily: "'Zin Display Condensed', 'Plus Jakarta Sans', sans-serif",
        color: 'rgba(0,142,117,0.08)', lineHeight: 1, marginBottom: -8,
      }}>
        ({String(index + 1).padStart(2, '0')})
      </div>

      <h2 style={{
        fontSize: 36, fontWeight: 500, color: '#1a1a1a',
        fontFamily: "'Zin Display Condensed', 'Plus Jakarta Sans', sans-serif",
        lineHeight: 1.08, margin: '0 0 8px',
      }}>
        {step.title || '(untitled)'}
      </h2>

      {step.subtitle && (
        <p style={{ fontSize: 15, color: '#888', margin: '0 0 0', lineHeight: 1.6 }}>
          {step.subtitle}
        </p>
      )}

      <div style={{ marginTop: 32 }}>
        {step.type === 'single-select' && <SelectPreview options={step.options || []} multi={false} />}
        {step.type === 'multi-select' && <SelectPreview options={step.options || []} multi={true} />}
        {step.type === 'dropdown' && <DropdownPreview options={step.options || []} />}
        {step.type === 'yes-no' && <YesNoPreview />}
        {step.type === 'text-input' && <TextInputPreview step={step} />}
        {step.type === 'long-text' && <LongTextPreview />}
        {step.type === 'field-group' && <FieldGroupPreview step={step} />}
        {step.type === 'number-picker' && <NumberPreview />}
        {step.type === 'rating' && <RatingPreview max={step.ratingMax || 5} />}
        {step.type === 'nps' && <NpsPreview labels={step.npsLabels} />}
        {step.type === 'opinion-scale' && <NpsPreview labels={step.npsLabels} max={10} />}
        {step.type === 'date' && <DatePreview />}
        {step.type === 'phone' && <PhonePreview />}
        {step.type === 'file-upload' && <FileUploadPreview step={step} />}
        {step.type === 'matrix' && <MatrixPreview step={step} />}
        {step.type === 'checkbox' && <CheckboxPreview step={step} />}
        {step.type === 'review' && <ReviewPreview />}
      </div>
    </>
  );
}

const optionStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 10,
  padding: '14px 16px', border: '1px solid #e0e0e0', borderRadius: 8,
  background: '#fff', cursor: 'default', fontSize: 14, color: '#333',
};

function SelectPreview({ options, multi }: { options: { label: string }[]; multi: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {options.map((o, i) => (
        <div key={i} style={optionStyle}>
          <div style={{
            width: 20, height: 20, borderRadius: multi ? 4 : 10,
            border: '2px solid #ccc', flexShrink: 0,
          }} />
          {o.label}
        </div>
      ))}
    </div>
  );
}

function DropdownPreview({ options }: { options: { label: string }[] }) {
  return (
    <div style={{
      padding: '12px 14px', border: '1px solid #e0e0e0', borderRadius: 8,
      background: '#fff', fontSize: 14, color: '#999',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <span>Select an option ({options.length} choices)</span>
      <span>▼</span>
    </div>
  );
}

function YesNoPreview() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      {['Yes', 'No'].map(label => (
        <div key={label} style={{
          ...optionStyle, flex: 1, justifyContent: 'center',
          fontWeight: 500,
        }}>
          {label}
        </div>
      ))}
    </div>
  );
}

function TextInputPreview({ step }: { step: FormStep }) {
  const field = step.fields?.[0];
  return (
    <div style={{
      padding: '12px 0', borderBottom: '2px solid #e0e0e0',
      fontSize: 16, color: '#bbb',
    }}>
      {field?.placeholder || 'Type your answer here...'}
    </div>
  );
}

function LongTextPreview() {
  return (
    <div style={{
      padding: '12px 0', borderBottom: '2px solid #e0e0e0',
      fontSize: 16, color: '#bbb', minHeight: 80,
    }}>
      Type your answer here...
    </div>
  );
}

function FieldGroupPreview({ step }: { step: FormStep }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(step.fields || []).map((f, i) => (
        <div key={i}>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#444', marginBottom: 6 }}>
            {f.label} {f.required && <span style={{ color: '#d44' }}>*</span>}
          </div>
          <div style={{
            padding: '10px 0', borderBottom: '2px solid #e0e0e0',
            fontSize: 14, color: '#bbb',
          }}>
            {f.placeholder || `Enter ${f.label.toLowerCase()}`}
          </div>
        </div>
      ))}
    </div>
  );
}

function NumberPreview() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <button style={{ width: 40, height: 40, borderRadius: 8, border: '1px solid #ddd', background: '#fff', fontSize: 20, cursor: 'default' }}>−</button>
      <span style={{ fontSize: 32, fontWeight: 600, color: '#1a1a1a', minWidth: 40, textAlign: 'center' }}>1</span>
      <button style={{ width: 40, height: 40, borderRadius: 8, border: '1px solid #ddd', background: '#fff', fontSize: 20, cursor: 'default' }}>+</button>
    </div>
  );
}

function RatingPreview({ max }: { max: number }) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {Array.from({ length: max }, (_, i) => (
        <div key={i} style={{ fontSize: 28, opacity: i === 0 ? 1 : 0.3, cursor: 'default' }}>★</div>
      ))}
    </div>
  );
}

function NpsPreview({ labels, max = 10 }: { labels?: { low: string; high: string }; max?: number }) {
  return (
    <div>
      <div style={{ display: 'flex', gap: 4 }}>
        {Array.from({ length: max + 1 }, (_, i) => (
          <div key={i} style={{
            flex: 1, height: 40, borderRadius: 6,
            border: '1px solid #e0e0e0', background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 500, color: '#666',
          }}>
            {i}
          </div>
        ))}
      </div>
      {labels && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: '#999' }}>
          <span>{labels.low}</span>
          <span>{labels.high}</span>
        </div>
      )}
    </div>
  );
}

function DatePreview() {
  return (
    <div style={{
      padding: '12px 14px', border: '1px solid #e0e0e0', borderRadius: 8,
      background: '#fff', fontSize: 14, color: '#999',
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <IconCalendar size={16} />
      <span>Select a date</span>
    </div>
  );
}

function PhonePreview() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '12px 0', borderBottom: '2px solid #e0e0e0',
    }}>
      <span style={{ fontSize: 14, color: '#666' }}>🇮🇳 +91</span>
      <span style={{ fontSize: 16, color: '#bbb' }}>Enter phone number</span>
    </div>
  );
}

function FileUploadPreview({ step }: { step: FormStep }) {
  return (
    <div style={{
      border: '2px dashed #d0d0d0', borderRadius: 12,
      padding: '32px 24px', textAlign: 'center',
      background: '#fff',
    }}>
      <IconFileUpload size={32} color="#bbb" style={{ marginBottom: 12 }} />
      <div style={{ fontSize: 14, fontWeight: 500, color: '#666' }}>
        {step.fileUpload?.label || 'Upload file'}
      </div>
      <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
        Max {step.fileUpload?.maxSizeMB || 10}MB · {(step.fileUpload?.accept || []).join(', ') || 'All files'}
      </div>
    </div>
  );
}

function MatrixPreview({ step }: { step: FormStep }) {
  const matrix = step.matrix;
  if (!matrix) return null;

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px 12px', color: '#999', fontWeight: 500 }} />
            {matrix.columns.map((col, i) => (
              <th key={i} style={{ textAlign: 'center', padding: '8px 8px', color: '#666', fontWeight: 500, fontSize: 12 }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.rows.map((row, ri) => (
            <tr key={row.id} style={{ borderTop: '1px solid #eee' }}>
              <td style={{ padding: '10px 12px', color: '#333' }}>{row.label}</td>
              {matrix.columns.map((_, ci) => (
                <td key={ci} style={{ textAlign: 'center', padding: '10px 8px' }}>
                  <div style={{ width: 18, height: 18, borderRadius: 9, border: '2px solid #ccc', margin: '0 auto' }} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CheckboxPreview({ step }: { step: FormStep }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {(step.checkboxItems || []).map((item, i) => (
        <label key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#333', cursor: 'default' }}>
          <div style={{ width: 18, height: 18, borderRadius: 4, border: '2px solid #ccc', flexShrink: 0, marginTop: 2 }} />
          {item}
        </label>
      ))}
    </div>
  );
}

function ReviewPreview() {
  return (
    <div style={{
      padding: '24px', border: '1px solid #e0e0e0', borderRadius: 12,
      background: '#fff', textAlign: 'center', color: '#888', fontSize: 14,
    }}>
      Review screen — shows all collected data for confirmation before submit.
    </div>
  );
}
