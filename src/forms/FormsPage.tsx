import { useMemo, useState } from 'react';
import {
  IconCheck,
  IconCopy,
  IconEye,
  IconListCheck,
} from '@tabler/icons-react';

import { FORM_REGISTRY, type FormCategory, type FormEntry } from './formRegistry';
import { FormPreviewModal } from './FormPreviewModal';

const SECTION_ORDER: FormCategory[] = ['Supply', 'Demand'];

export const FormsPage = () => {
  const [previewForm, setPreviewForm] = useState<FormEntry | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const map = new Map<FormCategory, FormEntry[]>();
    for (const section of SECTION_ORDER) {
      map.set(section, []);
    }
    for (const form of FORM_REGISTRY) {
      map.get(form.category)?.push(form);
    }
    return map;
  }, []);

  const handleCopyLink = (form: FormEntry) => {
    const url = `${window.location.origin}${form.formUrl}`;
    navigator.clipboard.writeText(url);
    setCopiedId(form.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif" }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '16px 24px',
        borderBottom: '1px solid #e6e6e6',
        background: '#fff',
      }}>
        <IconListCheck size={20} color="#555" />
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: '#1a1a1a' }}>Forms</h1>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        {SECTION_ORDER.map((section) => {
          const forms = grouped.get(section) ?? [];
          return (
            <div key={section} style={{ marginBottom: 24 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                marginBottom: 4,
              }}>
                <span style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}>
                  {section}
                </span>
                <span style={{ fontSize: 11, color: '#999' }}>{forms.length}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {forms.map((form) => (
                  <div
                    key={form.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '12px 16px',
                      borderBottom: '1px solid #f0f0f0',
                      transition: 'background 0.1s',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#fafafa'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 36,
                      height: 36,
                      borderRadius: 6,
                      background: '#f5f5f5',
                      color: '#666',
                      flexShrink: 0,
                    }}>
                      <form.icon size={18} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a' }}>
                        {form.name}
                      </div>
                      <div style={{
                        fontSize: 13,
                        color: '#999',
                        marginTop: 2,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {form.description}
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      flexShrink: 0,
                      color: '#999',
                      fontSize: 13,
                    }}>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: '#666',
                        background: '#f5f5f5',
                        borderRadius: 4,
                        padding: '2px 8px',
                      }}>
                        {form.tag}
                      </span>
                      <span>{form.steps.length} steps</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                      <button
                        onClick={() => setPreviewForm(form)}
                        title="Preview"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 32,
                          height: 32,
                          border: '1px solid #e0e0e0',
                          borderRadius: 6,
                          background: '#fff',
                          cursor: 'pointer',
                          color: '#666',
                        }}
                      >
                        <IconEye size={16} />
                      </button>
                      <button
                        onClick={() => handleCopyLink(form)}
                        title={copiedId === form.id ? 'Copied!' : 'Copy Link'}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 32,
                          height: 32,
                          border: '1px solid #e0e0e0',
                          borderRadius: 6,
                          background: '#fff',
                          cursor: 'pointer',
                          color: copiedId === form.id ? '#008E75' : '#666',
                        }}
                      >
                        {copiedId === form.id ? <IconCheck size={16} /> : <IconCopy size={16} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {previewForm && (
        <FormPreviewModal
          form={previewForm}
          onClose={() => setPreviewForm(null)}
        />
      )}
    </div>
  );
};
