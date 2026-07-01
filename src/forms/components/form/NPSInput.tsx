import { motion } from 'framer-motion';
import { COLORS } from '../../lib/constants';

interface Props {
  value: number | null;
  onChange: (value: number) => void;
  lowLabel?: string;
  highLabel?: string;
}

function getColor(n: number): string {
  if (n <= 6) return COLORS.danger;
  if (n <= 8) return COLORS.warning;
  return COLORS.primary;
}

export default function NPSInput({
  value,
  onChange,
  lowLabel = 'Not at all likely',
  highLabel = 'Extremely likely',
}: Props) {
  return (
    <div style={{ width: '100%', padding: '16px 0' }}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
        {Array.from({ length: 11 }, (_, i) => {
          const selected = value === i;
          const color = getColor(i);
          return (
            <motion.button
              key={i}
              onClick={() => onChange(i)}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                background: selected ? color : '#fff',
                borderColor: selected ? color : COLORS.border,
                color: selected ? '#fff' : COLORS.text,
              }}
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                border: `1.5px solid ${COLORS.border}`,
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {i}
            </motion.button>
          );
        })}
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 12,
        fontSize: 12,
        color: COLORS.muted,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
}
