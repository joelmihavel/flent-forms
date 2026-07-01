import { motion } from 'framer-motion';
import type { SelectOption } from '../../schema/types';
import { COLORS } from '../../lib/constants';

interface Props {
  options: SelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  maxSelections?: number;
}

const ACCENT_CYCLE = [COLORS.primary, '#C67040', '#332873', '#9A7A00', '#007A6A', '#CC5A7A'];

export default function MultiSelectInput({ options, value, onChange, maxSelections }: Props) {
  const toggle = (optValue: string) => {
    if (value.includes(optValue)) {
      onChange(value.filter((v) => v !== optValue));
    } else {
      if (maxSelections && value.length >= maxSelections) return;
      onChange([...value, optValue]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: '100%' }}>
      {maxSelections && (
        <div style={{
          fontSize: 12,
          color: COLORS.muted,
          marginBottom: 12,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
          Select up to {maxSelections}
        </div>
      )}
      {options.map((opt, i) => {
        const selected = value.includes(opt.value);
        const accent = ACCENT_CYCLE[i % ACCENT_CYCLE.length];
        return (
          <motion.button
            key={opt.value}
            onClick={() => toggle(opt.value)}
            whileHover={{ x: 8 }}
            whileTap={{ scale: 0.99 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '18px 0',
              background: 'transparent',
              border: 'none',
              borderBottom: i < options.length - 1 ? `1px solid ${COLORS.border}` : 'none',
              cursor: 'pointer',
              textAlign: 'left',
              outline: 'none',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              width: '100%',
            }}
          >
            <motion.div
              animate={{
                borderColor: selected ? accent : COLORS.border,
                background: selected ? accent : 'transparent',
              }}
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                border: `2px solid ${COLORS.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {selected && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7L6 10L11 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </motion.div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <motion.div
                animate={{ color: selected ? accent : COLORS.text }}
                style={{ fontSize: 16, fontWeight: 500 }}
              >
                {opt.label}
              </motion.div>
              {opt.description && (
                <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 2 }}>{opt.description}</div>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
