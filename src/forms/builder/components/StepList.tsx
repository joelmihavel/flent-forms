import {
  IconCalendar,
  IconCheck,
  IconCheckbox,
  IconClick,
  IconCopy,
  IconFileUpload,
  IconGripVertical,
  IconHandClick,
  IconHash,
  IconInfoCircle,
  IconList,
  IconListCheck,
  IconMoodSmile,
  IconNotes,
  IconPhone,
  IconPlus,
  IconRocket,
  IconStar,
  IconTextCaption,
  IconTrash,
  IconChevronUp,
  IconChevronDown,
} from '@tabler/icons-react';
import type { FormStep } from '../../schema/types';
import { useBuilderStore } from '../store/builderStore';

const STEP_ICONS: Record<string, typeof IconClick> = {
  welcome: IconRocket,
  'single-select': IconClick,
  'multi-select': IconListCheck,
  'number-picker': IconHash,
  'field-group': IconTextCaption,
  'file-upload': IconFileUpload,
  'text-input': IconTextCaption,
  'long-text': IconNotes,
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

interface StepListProps {
  onAddClick: () => void;
}

export function StepList({ onAddClick }: StepListProps) {
  const { steps, selectedStepIndex, selectStep, removeStep, moveStep, duplicateStep } = useBuilderStore();

  return (
    <div style={{
      width: 240,
      minWidth: 240,
      borderRight: '1px solid #e6e6e6',
      display: 'flex',
      flexDirection: 'column',
      background: '#fafafa',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '12px 12px 8px',
        borderBottom: '1px solid #eee',
        flexShrink: 0,
      }}>
        <button
          onClick={onAddClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            width: '100%',
            padding: '8px 12px',
            border: 'none',
            borderRadius: 8,
            background: '#008E75',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          <IconPlus size={16} />
          Add content
        </button>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '8px 8px' }}>
        {steps.length === 0 ? (
          <div style={{
            padding: '32px 16px',
            textAlign: 'center',
            color: '#999',
            fontSize: 13,
            lineHeight: 1.5,
          }}>
            No steps yet.<br />Click "Add content" to start building.
          </div>
        ) : (
          steps.map((step, index) => {
            const Icon = STEP_ICONS[step.type] || IconCheck;
            const isActive = selectedStepIndex === index;

            return (
              <div
                key={step.id}
                onClick={() => selectStep(index)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 8px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  background: isActive ? '#e8f4f1' : 'transparent',
                  border: isActive ? '1px solid #b8ddd5' : '1px solid transparent',
                  marginBottom: 2,
                  transition: 'all 0.1s',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  if (!isActive) e.currentTarget.style.background = '#f0f0f0';
                  const actions = e.currentTarget.querySelector('[data-actions]') as HTMLElement;
                  if (actions) actions.style.opacity = '1';
                }}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                  const actions = e.currentTarget.querySelector('[data-actions]') as HTMLElement;
                  if (actions && !isActive) actions.style.opacity = '0';
                }}
              >
                <IconGripVertical size={12} color="#ccc" style={{ flexShrink: 0, cursor: 'grab' }} />

                <div style={{
                  width: 26, height: 26, borderRadius: 6,
                  background: isActive ? '#008E75' : '#e8e8e8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={13} color={isActive ? '#fff' : '#777'} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 12,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#006b59' : '#444',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: 1.3,
                  }}>
                    {step.title || `(${step.type})`}
                  </div>
                  <div style={{
                    fontSize: 10,
                    color: '#aaa',
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                  }}>
                    {step.type.replace(/-/g, ' ')}
                  </div>
                </div>

                <div
                  data-actions=""
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 0.15s',
                    flexShrink: 0,
                  }}
                >
                  <ActionButton
                    icon={<IconChevronUp size={12} />}
                    title="Move up"
                    disabled={index === 0}
                    onClick={e => { e.stopPropagation(); moveStep(index, index - 1); }}
                  />
                  <ActionButton
                    icon={<IconChevronDown size={12} />}
                    title="Move down"
                    disabled={index === steps.length - 1}
                    onClick={e => { e.stopPropagation(); moveStep(index, index + 1); }}
                  />
                  <ActionButton
                    icon={<IconCopy size={12} />}
                    title="Duplicate"
                    onClick={e => { e.stopPropagation(); duplicateStep(index); }}
                  />
                  <ActionButton
                    icon={<IconTrash size={12} />}
                    title="Delete"
                    danger
                    onClick={e => { e.stopPropagation(); removeStep(index); }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      <div style={{
        padding: '10px 12px',
        borderTop: '1px solid #eee',
        flexShrink: 0,
        fontSize: 11,
        color: '#999',
        textAlign: 'center',
      }}>
        {steps.length} step{steps.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}

function ActionButton({
  icon,
  title,
  danger,
  disabled,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  danger?: boolean;
  disabled?: boolean;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      disabled={disabled}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 22,
        height: 22,
        border: 'none',
        borderRadius: 4,
        background: 'transparent',
        cursor: disabled ? 'default' : 'pointer',
        color: disabled ? '#ddd' : danger ? '#d44' : '#888',
        opacity: disabled ? 0.4 : 1,
        padding: 0,
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = danger ? '#fee' : '#eee'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
    >
      {icon}
    </button>
  );
}
