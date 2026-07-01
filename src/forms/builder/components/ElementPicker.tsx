import { useState } from 'react';
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
  IconMail,
  IconMoodSmile,
  IconNotes,
  IconPhone,
  IconRocket,
  IconStar,
  IconTextCaption,
  IconX,
} from '@tabler/icons-react';
import type { StepType } from '../../schema/types';

interface ElementPickerProps {
  onSelect: (type: StepType) => void;
  onClose: () => void;
}

type CategoryConfig = {
  label: string;
  color: string;
  items: { type: StepType; label: string; icon: typeof IconClick }[];
};

const CATEGORIES: CategoryConfig[] = [
  {
    label: 'Contact info',
    color: '#e8d5f5',
    items: [
      { type: 'field-group', label: 'Contact Info', icon: IconTextCaption },
      { type: 'text-input', label: 'Email', icon: IconMail },
      { type: 'phone', label: 'Phone Number', icon: IconPhone },
    ],
  },
  {
    label: 'Choice',
    color: '#d5eaf5',
    items: [
      { type: 'single-select', label: 'Single Choice', icon: IconClick },
      { type: 'multi-select', label: 'Multiple Choice', icon: IconListCheck },
      { type: 'dropdown', label: 'Dropdown', icon: IconList },
      { type: 'yes-no', label: 'Yes / No', icon: IconHandClick },
      { type: 'checkbox', label: 'Checkbox', icon: IconCheckbox },
    ],
  },
  {
    label: 'Rating & ranking',
    color: '#d5f5e3',
    items: [
      { type: 'nps', label: 'Net Promoter Score', icon: IconMoodSmile },
      { type: 'opinion-scale', label: 'Opinion Scale', icon: IconMoodSmile },
      { type: 'rating', label: 'Rating', icon: IconStar },
      { type: 'matrix', label: 'Matrix', icon: IconListCheck },
    ],
  },
  {
    label: 'Text',
    color: '#f5f0d5',
    items: [
      { type: 'long-text', label: 'Long Text', icon: IconNotes },
      { type: 'text-input', label: 'Short Text', icon: IconTextCaption },
    ],
  },
  {
    label: 'Other',
    color: '#f5d5d5',
    items: [
      { type: 'number-picker', label: 'Number', icon: IconHash },
      { type: 'date', label: 'Date', icon: IconCalendar },
      { type: 'file-upload', label: 'File Upload', icon: IconFileUpload },
      { type: 'welcome', label: 'Welcome Screen', icon: IconRocket },
      { type: 'info-screen', label: 'Statement', icon: IconInfoCircle },
    ],
  },
];

const ALL_ITEMS = CATEGORIES.flatMap(c => c.items.map(i => ({ ...i, category: c.label })));

export function ElementPicker({ onSelect, onClose }: ElementPickerProps) {
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? ALL_ITEMS.filter(i => i.label.toLowerCase().includes(search.toLowerCase()))
    : null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 12,
          width: 720,
          maxWidth: '90vw',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid #eee',
        }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#1a1a1a' }}>
            Add form element
          </h3>
          <button
            onClick={onClose}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 28, height: 28, border: '1px solid #e0e0e0', borderRadius: 6,
              background: '#fff', cursor: 'pointer', color: '#999',
            }}
          >
            <IconX size={14} />
          </button>
        </div>

        <div style={{ padding: '12px 20px 0' }}>
          <input
            type="text"
            placeholder="Search form elements..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              padding: '10px 14px',
              border: '1px solid #e0e0e0',
              borderRadius: 8,
              fontSize: 14,
              fontFamily: 'inherit',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px 20px' }}>
          {filtered ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {filtered.map((item, i) => (
                <ElementButton key={`${item.type}-${i}`} item={item} onSelect={onSelect} />
              ))}
              {filtered.length === 0 && (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 32, color: '#999', fontSize: 14 }}>
                  No elements match "{search}"
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {CATEGORIES.map(cat => (
                <div key={cat.label}>
                  <div style={{
                    fontSize: 12, fontWeight: 600, color: '#666',
                    textTransform: 'uppercase', letterSpacing: '0.04em',
                    marginBottom: 8,
                  }}>
                    {cat.label}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {cat.items.map((item, i) => (
                      <ElementButton key={`${item.type}-${i}`} item={item} color={cat.color} onSelect={onSelect} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ElementButton({
  item,
  color,
  onSelect,
}: {
  item: { type: StepType; label: string; icon: typeof IconClick };
  color?: string;
  onSelect: (type: StepType) => void;
}) {
  const Icon = item.icon;
  return (
    <button
      onClick={() => onSelect(item.type)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 12px',
        border: '1px solid #eee',
        borderRadius: 8,
        background: '#fff',
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'inherit',
        transition: 'all 0.12s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#ccc';
        e.currentTarget.style.background = '#fafafa';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#eee';
        e.currentTarget.style.background = '#fff';
      }}
    >
      <div style={{
        width: 32, height: 32, borderRadius: 8,
        background: color || '#f0f0f0',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={16} color="#555" />
      </div>
      <span style={{ fontSize: 13, fontWeight: 500, color: '#333' }}>{item.label}</span>
    </button>
  );
}
