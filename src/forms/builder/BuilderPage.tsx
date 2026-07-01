import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  IconArrowLeft,
  IconDeviceFloppy,
  IconEye,
  IconSettings,
} from '@tabler/icons-react';
import type { StepType } from '../schema/types';
import { useBuilderStore } from './store/builderStore';
import { StepList } from './components/StepList';
import { StepPreview } from './components/StepPreview';
import { StepConfig } from './components/StepConfig';
import { ElementPicker } from './components/ElementPicker';
import { FormSettings } from './components/FormSettings';

export function BuilderPage() {
  const { formId: paramFormId } = useParams<{ formId?: string }>();
  const navigate = useNavigate();
  const {
    formId, formName, isDirty, steps, selectedStepIndex,
    addStep, saveForm, loadForm, newForm, setFormName,
  } = useBuilderStore();

  const [showPicker, setShowPicker] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (paramFormId) {
      loadForm(paramFormId);
    } else if (!formId) {
      newForm();
    }
  }, [paramFormId]);

  const handleAddElement = (type: StepType) => {
    addStep(type, selectedStepIndex ?? undefined);
    setShowPicker(false);
  };

  const handleSave = () => {
    const savedId = saveForm();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    if (!paramFormId && savedId) {
      navigate(`/builder/${savedId}`, { replace: true });
    }
  };

  const handlePreview = () => {
    if (isDirty) handleSave();
    const id = formId || saveForm();
    window.open(`/forms/${id}`, '_blank');
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100vh',
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 16px', borderBottom: '1px solid #e6e6e6',
        background: '#fff', flexShrink: 0,
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 32, height: 32, border: '1px solid #e0e0e0', borderRadius: 6,
            background: '#fff', cursor: 'pointer', color: '#666',
          }}
        >
          <IconArrowLeft size={16} />
        </button>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 12, color: '#999' }}>Forms ›</span>
          <input
            value={formName}
            onChange={e => setFormName(e.target.value)}
            style={{
              border: 'none', outline: 'none', fontSize: 15, fontWeight: 600,
              color: '#1a1a1a', background: 'transparent', fontFamily: 'inherit',
              padding: '2px 4px', borderRadius: 4, minWidth: 100,
              maxWidth: 300,
            }}
            onFocus={e => { e.currentTarget.style.background = '#f5f5f5'; }}
            onBlur={e => { e.currentTarget.style.background = 'transparent'; }}
          />
          {isDirty && (
            <span style={{ fontSize: 10, color: '#f59e0b', fontWeight: 500 }}>unsaved</span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <button
            onClick={() => setShowSettings(true)}
            title="Settings"
            style={topBarBtn}
          >
            <IconSettings size={16} />
          </button>
          <button
            onClick={handlePreview}
            title="Preview"
            style={topBarBtn}
            disabled={steps.length === 0}
          >
            <IconEye size={16} />
            <span style={{ fontSize: 13 }}>Preview</span>
          </button>
          <button
            onClick={handleSave}
            style={{
              ...topBarBtn,
              background: saved ? '#e8f5e9' : '#008E75',
              color: saved ? '#2e7d32' : '#fff',
              border: 'none',
            }}
          >
            {saved ? <IconDeviceFloppy size={16} /> : <IconDeviceFloppy size={16} />}
            <span style={{ fontSize: 13 }}>{saved ? 'Saved!' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <StepList onAddClick={() => setShowPicker(true)} />
        <StepPreview />
        <StepConfig />
      </div>

      {showPicker && (
        <ElementPicker
          onSelect={handleAddElement}
          onClose={() => setShowPicker(false)}
        />
      )}

      {showSettings && (
        <FormSettings onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}

const topBarBtn: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 6,
  padding: '6px 14px', border: '1px solid #e0e0e0', borderRadius: 6,
  background: '#fff', cursor: 'pointer', color: '#444',
  fontFamily: 'inherit', fontWeight: 500, fontSize: 13,
};
