import { useState } from 'react';
import { IconPlus, IconTrash, IconGripVertical } from '@tabler/icons-react';
import type { FormStep, FieldDefinition, SelectOption, ConditionalRule } from '../../schema/types';
import { useBuilderStore } from '../store/builderStore';

export function StepConfig() {
  const { steps, selectedStepIndex, updateStep } = useBuilderStore();

  if (selectedStepIndex === null || !steps[selectedStepIndex]) {
    return (
      <div style={{
        width: 300, minWidth: 300, borderLeft: '1px solid #e6e6e6',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#999', fontSize: 13, padding: 24, textAlign: 'center',
        background: '#fafafa',
      }}>
        Select a step to configure
      </div>
    );
  }

  const step = steps[selectedStepIndex];
  const update = (changes: Partial<FormStep>) => updateStep(selectedStepIndex, changes);

  return (
    <div style={{
      width: 300, minWidth: 300, borderLeft: '1px solid #e6e6e6',
      display: 'flex', flexDirection: 'column', background: '#fafafa',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '14px 16px',
        borderBottom: '1px solid #eee',
        flexShrink: 0,
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {step.type.replace(/-/g, ' ')}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginTop: 2 }}>
          Question settings
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
        <ConfigSection label="Title">
          <ConfigInput
            value={step.title}
            onChange={v => update({ title: v })}
            placeholder="Enter question title"
          />
        </ConfigSection>

        <ConfigSection label="Description (optional)">
          <ConfigTextarea
            value={step.subtitle || ''}
            onChange={v => update({ subtitle: v || undefined })}
            placeholder="Add a description"
          />
        </ConfigSection>

        {(step.type === 'welcome' || step.type === 'info-screen') && (
          <WelcomeConfig step={step} update={update} />
        )}

        {(step.type === 'single-select' || step.type === 'multi-select' || step.type === 'dropdown') && (
          <OptionsConfig step={step} update={update} />
        )}

        {step.type === 'field-group' && (
          <FieldsConfig step={step} update={update} />
        )}

        {step.type === 'text-input' && (
          <TextInputConfig step={step} update={update} />
        )}

        {step.type === 'rating' && (
          <ConfigSection label="Max rating">
            <ConfigInput
              value={String(step.ratingMax || 5)}
              onChange={v => update({ ratingMax: parseInt(v) || 5 })}
              type="number"
            />
          </ConfigSection>
        )}

        {(step.type === 'nps' || step.type === 'opinion-scale') && (
          <NpsConfig step={step} update={update} />
        )}

        {step.type === 'matrix' && (
          <MatrixConfig step={step} update={update} />
        )}

        {step.type === 'file-upload' && (
          <FileUploadConfig step={step} update={update} />
        )}

        {step.type === 'checkbox' && (
          <CheckboxConfig step={step} update={update} />
        )}

        {step.type === 'multi-select' && (
          <ConfigSection label="Max selections (0 = unlimited)">
            <ConfigInput
              value={String(step.maxSelections || 0)}
              onChange={v => update({ maxSelections: parseInt(v) || undefined })}
              type="number"
            />
          </ConfigSection>
        )}

        <ConfigSection label="Field name">
          <ConfigInput
            value={(step.meta?.fieldName as string) || ''}
            onChange={v => update({ meta: { ...step.meta, fieldName: v } })}
            placeholder="Auto-generated if empty"
          />
        </ConfigSection>

        <ConditionConfig step={step} update={update} allSteps={steps} currentIndex={selectedStepIndex} />
      </div>
    </div>
  );
}

function ConfigSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#666', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function ConfigInput({ value, onChange, placeholder, type = 'text' }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%', padding: '8px 10px', border: '1px solid #ddd',
        borderRadius: 6, fontSize: 13, fontFamily: 'inherit', outline: 'none',
        background: '#fff',
      }}
    />
  );
}

function ConfigTextarea({ value, onChange, placeholder }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      style={{
        width: '100%', padding: '8px 10px', border: '1px solid #ddd',
        borderRadius: 6, fontSize: 13, fontFamily: 'inherit', outline: 'none',
        resize: 'vertical', background: '#fff',
      }}
    />
  );
}

function WelcomeConfig({ step, update }: { step: FormStep; update: (c: Partial<FormStep>) => void }) {
  return (
    <>
      {step.type === 'welcome' && (
        <>
          <ConfigSection label="Button label">
            <ConfigInput
              value={(step.meta?.ctaLabel as string) || 'Get Started'}
              onChange={v => update({ meta: { ...step.meta, ctaLabel: v } })}
            />
          </ConfigSection>
          <ConfigSection label="Estimated time">
            <ConfigInput
              value={(step.meta?.estimatedTime as string) || ''}
              onChange={v => update({ meta: { ...step.meta, estimatedTime: v } })}
              placeholder="e.g. ~5 min"
            />
          </ConfigSection>
        </>
      )}
      {step.type === 'info-screen' && (
        <ConfigSection label="Icon emoji">
          <ConfigInput
            value={(step.meta?.icon as string) || '📋'}
            onChange={v => update({ meta: { ...step.meta, icon: v } })}
          />
        </ConfigSection>
      )}
    </>
  );
}

function OptionsConfig({ step, update }: { step: FormStep; update: (c: Partial<FormStep>) => void }) {
  const options = step.options || [];

  const addOption = () => {
    const n = options.length + 1;
    update({ options: [...options, { label: `Option ${n}`, value: `option_${n}` }] });
  };

  const removeOption = (i: number) => {
    update({ options: options.filter((_, idx) => idx !== i) });
  };

  const updateOption = (i: number, changes: Partial<SelectOption>) => {
    const newOpts = [...options];
    newOpts[i] = { ...newOpts[i], ...changes };
    if (changes.label && !options[i].value.startsWith('custom_')) {
      newOpts[i].value = changes.label.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    }
    update({ options: newOpts });
  };

  return (
    <ConfigSection label="Options">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {options.map((opt, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <IconGripVertical size={10} color="#ccc" />
            <input
              value={opt.label}
              onChange={e => updateOption(i, { label: e.target.value })}
              style={{
                flex: 1, padding: '6px 8px', border: '1px solid #ddd',
                borderRadius: 4, fontSize: 12, fontFamily: 'inherit', outline: 'none',
              }}
            />
            <button
              onClick={() => removeOption(i)}
              style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ccc', padding: 2 }}
            >
              <IconTrash size={12} />
            </button>
          </div>
        ))}
        <button
          onClick={addOption}
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '6px 8px', border: '1px dashed #ccc', borderRadius: 4,
            background: 'transparent', cursor: 'pointer', fontSize: 12,
            color: '#888', fontFamily: 'inherit',
          }}
        >
          <IconPlus size={12} /> Add option
        </button>
      </div>
    </ConfigSection>
  );
}

function FieldsConfig({ step, update }: { step: FormStep; update: (c: Partial<FormStep>) => void }) {
  const fields = step.fields || [];

  const addField = () => {
    const n = fields.length + 1;
    const newField: FieldDefinition = {
      name: `field_${n}_${Date.now()}`,
      type: 'text',
      label: `Field ${n}`,
      placeholder: '',
      required: false,
    };
    update({ fields: [...fields, newField] });
  };

  const removeField = (i: number) => {
    update({ fields: fields.filter((_, idx) => idx !== i) });
  };

  const updateField = (i: number, changes: Partial<FieldDefinition>) => {
    const newFields = [...fields];
    newFields[i] = { ...newFields[i], ...changes };
    update({ fields: newFields });
  };

  return (
    <ConfigSection label="Fields">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {fields.map((field, i) => (
          <div key={i} style={{
            border: '1px solid #e0e0e0', borderRadius: 6,
            padding: '8px 10px', background: '#fff',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <input
                value={field.label}
                onChange={e => updateField(i, { label: e.target.value })}
                placeholder="Field label"
                style={{
                  flex: 1, padding: '4px 6px', border: '1px solid #ddd',
                  borderRadius: 4, fontSize: 12, fontFamily: 'inherit', outline: 'none',
                }}
              />
              <button
                onClick={() => removeField(i)}
                style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ccc', padding: 2 }}
              >
                <IconTrash size={12} />
              </button>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <select
                value={field.type}
                onChange={e => updateField(i, { type: e.target.value as FieldDefinition['type'] })}
                style={{
                  flex: 1, padding: '4px 6px', border: '1px solid #ddd',
                  borderRadius: 4, fontSize: 11, fontFamily: 'inherit', outline: 'none',
                }}
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="tel">Phone</option>
                <option value="number">Number</option>
                <option value="textarea">Textarea</option>
              </select>
              <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#666' }}>
                <input
                  type="checkbox"
                  checked={field.required || false}
                  onChange={e => updateField(i, { required: e.target.checked })}
                />
                Required
              </label>
            </div>
          </div>
        ))}
        <button
          onClick={addField}
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '6px 8px', border: '1px dashed #ccc', borderRadius: 4,
            background: 'transparent', cursor: 'pointer', fontSize: 12,
            color: '#888', fontFamily: 'inherit',
          }}
        >
          <IconPlus size={12} /> Add field
        </button>
      </div>
    </ConfigSection>
  );
}

function TextInputConfig({ step, update }: { step: FormStep; update: (c: Partial<FormStep>) => void }) {
  const field = step.fields?.[0];
  if (!field) return null;

  const updateField = (changes: Partial<FieldDefinition>) => {
    const newFields = [...(step.fields || [])];
    newFields[0] = { ...newFields[0], ...changes };
    update({ fields: newFields });
  };

  return (
    <>
      <ConfigSection label="Placeholder">
        <ConfigInput
          value={field.placeholder || ''}
          onChange={v => updateField({ placeholder: v })}
          placeholder="Enter placeholder text"
        />
      </ConfigSection>
      <ConfigSection label="Required">
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
          <input
            type="checkbox"
            checked={field.required || false}
            onChange={e => updateField({ required: e.target.checked })}
          />
          This field is required
        </label>
      </ConfigSection>
    </>
  );
}

function NpsConfig({ step, update }: { step: FormStep; update: (c: Partial<FormStep>) => void }) {
  return (
    <>
      <ConfigSection label="Low label">
        <ConfigInput
          value={step.npsLabels?.low || ''}
          onChange={v => update({ npsLabels: { ...step.npsLabels!, low: v } })}
        />
      </ConfigSection>
      <ConfigSection label="High label">
        <ConfigInput
          value={step.npsLabels?.high || ''}
          onChange={v => update({ npsLabels: { ...step.npsLabels!, high: v } })}
        />
      </ConfigSection>
    </>
  );
}

function MatrixConfig({ step, update }: { step: FormStep; update: (c: Partial<FormStep>) => void }) {
  const matrix = step.matrix || { rows: [], columns: [] };

  const addRow = () => {
    const n = matrix.rows.length + 1;
    update({ matrix: { ...matrix, rows: [...matrix.rows, { id: `row_${n}`, label: `Item ${n}` }] } });
  };

  const removeRow = (i: number) => {
    update({ matrix: { ...matrix, rows: matrix.rows.filter((_, idx) => idx !== i) } });
  };

  const updateRow = (i: number, label: string) => {
    const newRows = [...matrix.rows];
    newRows[i] = { ...newRows[i], label };
    update({ matrix: { ...matrix, rows: newRows } });
  };

  const addColumn = () => {
    const n = matrix.columns.length + 1;
    update({ matrix: { ...matrix, columns: [...matrix.columns, { label: `Column ${n}`, value: `col_${n}` }] } });
  };

  const removeColumn = (i: number) => {
    update({ matrix: { ...matrix, columns: matrix.columns.filter((_, idx) => idx !== i) } });
  };

  const updateColumn = (i: number, label: string) => {
    const newCols = [...matrix.columns];
    newCols[i] = { ...newCols[i], label, value: label.toLowerCase().replace(/[^a-z0-9]+/g, '_') };
    update({ matrix: { ...matrix, columns: newCols } });
  };

  return (
    <>
      <ConfigSection label="Rows">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {matrix.rows.map((row, i) => (
            <div key={row.id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input
                value={row.label}
                onChange={e => updateRow(i, e.target.value)}
                style={{ flex: 1, padding: '4px 6px', border: '1px solid #ddd', borderRadius: 4, fontSize: 12, fontFamily: 'inherit', outline: 'none' }}
              />
              <button onClick={() => removeRow(i)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ccc', padding: 2 }}>
                <IconTrash size={11} />
              </button>
            </div>
          ))}
          <button onClick={addRow} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 6px', border: '1px dashed #ccc', borderRadius: 4, background: 'transparent', cursor: 'pointer', fontSize: 11, color: '#888', fontFamily: 'inherit' }}>
            <IconPlus size={11} /> Add row
          </button>
        </div>
      </ConfigSection>
      <ConfigSection label="Columns">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {matrix.columns.map((col, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input
                value={col.label}
                onChange={e => updateColumn(i, e.target.value)}
                style={{ flex: 1, padding: '4px 6px', border: '1px solid #ddd', borderRadius: 4, fontSize: 12, fontFamily: 'inherit', outline: 'none' }}
              />
              <button onClick={() => removeColumn(i)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ccc', padding: 2 }}>
                <IconTrash size={11} />
              </button>
            </div>
          ))}
          <button onClick={addColumn} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 6px', border: '1px dashed #ccc', borderRadius: 4, background: 'transparent', cursor: 'pointer', fontSize: 11, color: '#888', fontFamily: 'inherit' }}>
            <IconPlus size={11} /> Add column
          </button>
        </div>
      </ConfigSection>
    </>
  );
}

function FileUploadConfig({ step, update }: { step: FormStep; update: (c: Partial<FormStep>) => void }) {
  const config = step.fileUpload || { accept: [], maxSizeMB: 10, label: '' };

  return (
    <>
      <ConfigSection label="Upload label">
        <ConfigInput
          value={config.label}
          onChange={v => update({ fileUpload: { ...config, label: v } })}
        />
      </ConfigSection>
      <ConfigSection label="Max size (MB)">
        <ConfigInput
          value={String(config.maxSizeMB)}
          onChange={v => update({ fileUpload: { ...config, maxSizeMB: parseInt(v) || 10 } })}
          type="number"
        />
      </ConfigSection>
      <ConfigSection label="Accepted formats (comma-separated)">
        <ConfigInput
          value={config.accept.join(', ')}
          onChange={v => update({ fileUpload: { ...config, accept: v.split(',').map(s => s.trim()).filter(Boolean) } })}
          placeholder=".jpg, .png, .pdf"
        />
      </ConfigSection>
    </>
  );
}

function CheckboxConfig({ step, update }: { step: FormStep; update: (c: Partial<FormStep>) => void }) {
  const items = step.checkboxItems || [];

  const addItem = () => {
    update({ checkboxItems: [...items, `Item ${items.length + 1}`] });
  };

  const removeItem = (i: number) => {
    update({ checkboxItems: items.filter((_, idx) => idx !== i) });
  };

  const updateItem = (i: number, value: string) => {
    const newItems = [...items];
    newItems[i] = value;
    update({ checkboxItems: newItems });
  };

  return (
    <ConfigSection label="Checkbox items">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <input
              value={item}
              onChange={e => updateItem(i, e.target.value)}
              style={{ flex: 1, padding: '4px 6px', border: '1px solid #ddd', borderRadius: 4, fontSize: 12, fontFamily: 'inherit', outline: 'none' }}
            />
            <button onClick={() => removeItem(i)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ccc', padding: 2 }}>
              <IconTrash size={11} />
            </button>
          </div>
        ))}
        <button onClick={addItem} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 6px', border: '1px dashed #ccc', borderRadius: 4, background: 'transparent', cursor: 'pointer', fontSize: 11, color: '#888', fontFamily: 'inherit' }}>
          <IconPlus size={11} /> Add item
        </button>
      </div>
    </ConfigSection>
  );
}

function ConditionConfig({ step, update, allSteps, currentIndex }: {
  step: FormStep; update: (c: Partial<FormStep>) => void; allSteps: FormStep[]; currentIndex: number;
}) {
  const [showCondition, setShowCondition] = useState(!!step.condition);
  const precedingSteps = allSteps.slice(0, currentIndex).filter(s =>
    s.type === 'single-select' || s.type === 'yes-no' || s.type === 'dropdown' || s.type === 'multi-select'
  );

  if (precedingSteps.length === 0) return null;

  return (
    <ConfigSection label="Branching / Condition">
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginBottom: 8 }}>
        <input
          type="checkbox"
          checked={showCondition}
          onChange={e => {
            setShowCondition(e.target.checked);
            if (!e.target.checked) update({ condition: undefined });
          }}
        />
        Show only when...
      </label>
      {showCondition && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '8px', background: '#fff', borderRadius: 6, border: '1px solid #e0e0e0' }}>
          <select
            value={step.condition?.field || ''}
            onChange={e => {
              const field = e.target.value;
              update({ condition: field ? { field, operator: 'eq', value: '' } : undefined });
            }}
            style={{ padding: '4px 6px', border: '1px solid #ddd', borderRadius: 4, fontSize: 12, fontFamily: 'inherit' }}
          >
            <option value="">Select a field...</option>
            {precedingSteps.map(s => {
              const fieldName = (s.meta?.fieldName as string) || s.id;
              return <option key={s.id} value={fieldName}>{s.title} ({fieldName})</option>;
            })}
          </select>
          {step.condition?.field && (
            <>
              <select
                value={step.condition.operator}
                onChange={e => update({ condition: { ...step.condition!, operator: e.target.value as ConditionalRule['operator'] } })}
                style={{ padding: '4px 6px', border: '1px solid #ddd', borderRadius: 4, fontSize: 12, fontFamily: 'inherit' }}
              >
                <option value="eq">equals</option>
                <option value="neq">does not equal</option>
                <option value="gt">greater than</option>
                <option value="lt">less than</option>
                <option value="gte">greater than or equal</option>
                <option value="lte">less than or equal</option>
              </select>
              <input
                value={String(step.condition.value || '')}
                onChange={e => update({ condition: { ...step.condition!, value: e.target.value } })}
                placeholder="Value"
                style={{ padding: '4px 6px', border: '1px solid #ddd', borderRadius: 4, fontSize: 12, fontFamily: 'inherit', outline: 'none' }}
              />
            </>
          )}
        </div>
      )}
    </ConfigSection>
  );
}
