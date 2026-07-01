import { useState } from 'react';
import { IconCopy, IconCheck, IconDownload, IconLink } from '@tabler/icons-react';
import { useBuilderStore } from '../store/builderStore';

interface FormSettingsProps {
  onClose: () => void;
}

export function FormSettings({ onClose }: FormSettingsProps) {
  const {
    formId, formName, formDescription, steps,
    successTitle, successSubtitle, webhookUrl,
    setFormName, setFormDescription,
    setSuccessTitle, setSuccessSubtitle, setWebhookUrl,
  } = useBuilderStore();

  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleExportJson = () => {
    const schema = {
      id: formId,
      name: formName,
      description: formDescription,
      steps,
      successTitle,
      successSubtitle,
      webhookUrl,
    };
    const blob = new Blob([JSON.stringify(schema, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyJson = () => {
    const schema = { id: formId, name: formName, steps, successTitle, successSubtitle };
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleCopyLink = () => {
    if (formId) {
      const url = `${window.location.origin}/forms/${formId}`;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 12, width: 520,
          maxWidth: '90vw', maxHeight: '85vh',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        }}
      >
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid #eee',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Form Settings</h3>
          <button
            onClick={onClose}
            style={{
              border: '1px solid #ddd', borderRadius: 6, background: '#fff',
              padding: '4px 12px', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit',
            }}
          >
            Done
          </button>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
          <Section label="Form name">
            <Input value={formName} onChange={setFormName} placeholder="Form name" />
          </Section>

          <Section label="Description">
            <Textarea value={formDescription} onChange={setFormDescription} placeholder="Describe what this form is for" />
          </Section>

          <Divider />

          <Section label="Success screen title">
            <Input value={successTitle} onChange={setSuccessTitle} placeholder="You're all set!" />
          </Section>

          <Section label="Success screen subtitle">
            <Textarea value={successSubtitle} onChange={setSuccessSubtitle} placeholder="Thanks for your submission." />
          </Section>

          <Divider />

          <Section label="Webhook URL (per-step)">
            <Input value={webhookUrl} onChange={setWebhookUrl} placeholder="https://your-api.com/webhook" />
            <div style={{ fontSize: 11, color: '#999', marginTop: 4 }}>
              Receives a POST on every step completion with the answer data.
            </div>
          </Section>

          <Divider />

          <Section label="Share & Export">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {formId && (
                <button onClick={handleCopyLink} style={actionButtonStyle}>
                  {copiedLink ? <IconCheck size={14} color="#008E75" /> : <IconLink size={14} />}
                  {copiedLink ? 'Copied!' : 'Copy form link'}
                </button>
              )}
              <button onClick={handleCopyJson} style={actionButtonStyle}>
                {copiedJson ? <IconCheck size={14} color="#008E75" /> : <IconCopy size={14} />}
                {copiedJson ? 'Copied!' : 'Copy schema JSON'}
              </button>
              <button onClick={handleExportJson} style={actionButtonStyle}>
                <IconDownload size={14} />
                Download schema JSON
              </button>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#555', marginBottom: 6 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: '#eee', margin: '20px 0' }} />;
}

function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%', padding: '10px 12px', border: '1px solid #ddd',
        borderRadius: 6, fontSize: 14, fontFamily: 'inherit', outline: 'none',
      }}
    />
  );
}

function Textarea({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      style={{
        width: '100%', padding: '10px 12px', border: '1px solid #ddd',
        borderRadius: 6, fontSize: 14, fontFamily: 'inherit', outline: 'none',
        resize: 'vertical',
      }}
    />
  );
}

const actionButtonStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 8,
  padding: '10px 14px', border: '1px solid #ddd', borderRadius: 6,
  background: '#fff', cursor: 'pointer', fontSize: 13,
  fontFamily: 'inherit', color: '#444', fontWeight: 500,
  textAlign: 'left', width: '100%',
};
