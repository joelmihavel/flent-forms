import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconCheck,
  IconCopy,
  IconEdit,
  IconEye,
  IconListCheck,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';

import { FORM_REGISTRY, type FormCategory, type FormEntry } from './formRegistry';
import { FormPreviewModal } from './FormPreviewModal';
import { getCustomForms, deleteCustomForm } from './builder/store/builderStore';

type SectionKey = FormCategory | 'Custom';
const SECTION_ORDER: SectionKey[] = ['Supply', 'Demand', 'Custom'];

export const FormsPage = () => {
  const navigate = useNavigate();
  const [previewForm, setPreviewForm] = useState<FormEntry | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const { grouped, customForms } = useMemo(() => {
    const map = new Map<SectionKey, FormEntry[]>();
    map.set('Supply', []);
    map.set('Demand', []);
    map.set('Custom', []);
    for (const form of FORM_REGISTRY) {
      map.get(form.category)?.push(form);
    }
    const custom = getCustomForms();
    return { grouped: map, customForms: custom };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  const handleCopyLink = (formUrl: string, id: string) => {
    const url = `${window.location.origin}${formUrl}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteCustom = (formId: string) => {
    if (confirm('Delete this form? This cannot be undone.')) {
      deleteCustomForm(formId);
      setRefreshKey(k => k + 1);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif" }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        borderBottom: '1px solid #e6e6e6',
        background: '#fff',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <IconListCheck size={20} color="#555" />
          <h1 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: '#1a1a1a' }}>Forms</h1>
        </div>
        <button
          onClick={() => navigate('/builder')}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', border: 'none', borderRadius: 8,
            background: '#008E75', color: '#fff', fontSize: 13,
            fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          <IconPlus size={16} />
          New Form
        </button>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        {SECTION_ORDER.map((section) => {
          const builtInForms = grouped.get(section) ?? [];
          const isCustomSection = section === 'Custom';
          const custom = isCustomSection ? customForms : [];

          if (isCustomSection && custom.length === 0) return null;

          return (
            <div key={section} style={{ marginBottom: 24 }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 16px', marginBottom: 4,
              }}>
                <span style={{
                  fontSize: 12, fontWeight: 600, color: '#666',
                  textTransform: 'uppercase', letterSpacing: '0.04em',
                }}>
                  {section}
                </span>
                <span style={{ fontSize: 11, color: '#999' }}>
                  {isCustomSection ? custom.length : builtInForms.length}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {!isCustomSection && builtInForms.map((form) => (
                  <FormRow
                    key={form.id}
                    name={form.name}
                    description={form.description}
                    tag={form.tag}
                    stepCount={form.steps.length}
                    icon={<form.icon size={18} />}
                    copiedId={copiedId}
                    id={form.id}
                    onPreview={() => setPreviewForm(form)}
                    onCopyLink={() => handleCopyLink(form.formUrl, form.id)}
                  />
                ))}

                {isCustomSection && custom.map((form) => (
                  <FormRow
                    key={form.id}
                    name={form.name}
                    description={form.description}
                    tag="Custom"
                    stepCount={form.steps.length}
                    icon={<IconEdit size={18} />}
                    copiedId={copiedId}
                    id={form.id}
                    onPreview={() => window.open(`/forms/${form.id}`, '_blank')}
                    onCopyLink={() => handleCopyLink(`/forms/${form.id}`, form.id)}
                    onEdit={() => navigate(`/builder/${form.id}`)}
                    onDelete={() => handleDeleteCustom(form.id)}
                  />
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

function FormRow({
  name, description, tag, stepCount, icon,
  copiedId, id,
  onPreview, onCopyLink, onEdit, onDelete,
}: {
  name: string;
  description: string;
  tag: string;
  stepCount: number;
  icon: React.ReactNode;
  copiedId: string | null;
  id: string;
  onPreview: () => void;
  onCopyLink: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 16px', borderBottom: '1px solid #f0f0f0',
        transition: 'background 0.1s', cursor: 'default',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#fafafa'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 36, height: 36, borderRadius: 6,
        background: '#f5f5f5', color: '#666', flexShrink: 0,
      }}>
        {icon}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a' }}>{name}</div>
        <div style={{
          fontSize: 13, color: '#999', marginTop: 2,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {description}
        </div>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        flexShrink: 0, color: '#999', fontSize: 13,
      }}>
        <span style={{
          fontSize: 11, fontWeight: 500, color: '#666',
          background: '#f5f5f5', borderRadius: 4, padding: '2px 8px',
        }}>
          {tag}
        </span>
        <span>{stepCount} steps</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
        {onEdit && (
          <RowButton onClick={onEdit} title="Edit" icon={<IconEdit size={16} />} />
        )}
        <RowButton onClick={onPreview} title="Preview" icon={<IconEye size={16} />} />
        <RowButton
          onClick={onCopyLink}
          title={copiedId === id ? 'Copied!' : 'Copy Link'}
          icon={copiedId === id ? <IconCheck size={16} /> : <IconCopy size={16} />}
          color={copiedId === id ? '#008E75' : undefined}
        />
        {onDelete && (
          <RowButton onClick={onDelete} title="Delete" icon={<IconTrash size={16} />} color="#d44" />
        )}
      </div>
    </div>
  );
}

function RowButton({ onClick, title, icon, color }: {
  onClick: () => void; title: string; icon: React.ReactNode; color?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 32, height: 32, border: '1px solid #e0e0e0', borderRadius: 6,
        background: '#fff', cursor: 'pointer', color: color || '#666',
      }}
    >
      {icon}
    </button>
  );
}
