

import type { FormStep } from '../../schema/types';
import { COLORS } from '../../lib/constants';
import { motion } from 'framer-motion';

interface Props {
  step: FormStep;
  value: string;
  onChange: (value: string) => void;
}

const ROLE_META: Record<string, { icon: string; accent: string; letter: string }> = {
  owner: { icon: '🏠', accent: COLORS.primary, letter: 'O' },
  poc: { icon: '📋', accent: '#C67040', letter: 'P' },
  both: { icon: '🤝', accent: '#332873', letter: 'B' },
};

const ACCENT_CYCLE = [COLORS.primary, '#C67040', '#332873', '#9A7A00', '#007A6A', '#CC5A7A'];

export default function RoleSelector({ step, value, onChange }: Props) {
  const options = step.options || [];

  return (
    <div role="radiogroup" aria-label="Select your role" style={{ display: 'flex', flexDirection: 'column', gap: 0, width: '100%' }}>
      {options.map((opt, i) => {
        const selected = value === opt.value;
        const meta = ROLE_META[opt.value] || {
          icon: '',
          accent: ACCENT_CYCLE[i % ACCENT_CYCLE.length],
          letter: opt.label.charAt(0).toUpperCase(),
        };
        return (
          <motion.button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            role="radio"
            aria-checked={selected}
            aria-label={opt.label}
            whileHover={{ x: 8 }}
            whileTap={{ scale: 0.99 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              padding: '24px 0',
              background: 'transparent',
              border: 'none',
              borderBottom: i < options.length - 1 ? `1px solid ${COLORS.border}` : 'none',
              cursor: 'pointer',
              textAlign: 'left',
              outline: 'none',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              width: '100%',
              position: 'relative',
            }}
          >
            <motion.div
              animate={{
                color: selected ? meta.accent : '#E0DDD8',
              }}
              style={{
                fontSize: 40,
                fontWeight: 700,
                fontFamily: "'Zin Display Condensed', 'Plus Jakarta Sans', sans-serif",
                lineHeight: 1,
                width: 44,
                flexShrink: 0,
                textAlign: 'center',
              }}
            >
              {meta.letter}
            </motion.div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <motion.div
                animate={{ color: selected ? meta.accent : COLORS.text }}
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                }}
              >
                {opt.label}
              </motion.div>
              {opt.description && (
                <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 4, lineHeight: 1.5 }}>{opt.description}</div>
              )}
            </div>
            <motion.div
              animate={{
                scale: selected ? 1 : 0,
                opacity: selected ? 1 : 0,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: meta.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7L6 10L11 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
            {selected && (
              <motion.div
                layoutId="role-indicator"
                style={{
                  position: 'absolute',
                  left: -16,
                  top: '50%',
                  width: 3,
                  height: 32,
                  borderRadius: 2,
                  background: meta.accent,
                  transform: 'translateY(-50%)',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
