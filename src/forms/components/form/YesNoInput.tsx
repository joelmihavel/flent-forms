import { motion } from 'framer-motion';
import { COLORS } from '../../lib/constants';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function YesNoInput({ value, onChange }: Props) {
  const options = [
    { label: 'Yes', val: 'yes', icon: '✓', accent: COLORS.primary },
    { label: 'No', val: 'no', icon: '✕', accent: COLORS.danger },
  ];

  return (
    <div style={{ display: 'flex', gap: 16, padding: '16px 0' }}>
      {options.map((opt) => {
        const selected = value === opt.val;
        return (
          <motion.button
            key={opt.val}
            onClick={() => onChange(opt.val)}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            animate={{
              borderColor: selected ? opt.accent : COLORS.border,
              background: selected ? (opt.val === 'yes' ? COLORS.pastelGreen : COLORS.pastelRed) : '#fff',
            }}
            style={{
              flex: 1,
              height: 72,
              borderRadius: 16,
              border: `2px solid ${COLORS.border}`,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 18,
              fontWeight: 600,
              color: selected ? opt.accent : COLORS.text,
            }}
          >
            <span style={{ fontSize: 20 }}>{opt.icon}</span>
            {opt.label}
          </motion.button>
        );
      })}
    </div>
  );
}
