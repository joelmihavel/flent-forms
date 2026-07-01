import { motion } from 'framer-motion';
import { COLORS } from '../../lib/constants';

interface Props {
  value: number | null;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  lowLabel?: string;
  highLabel?: string;
}

function getScaleColor(n: number, max: number): string {
  const ratio = n / max;
  if (ratio <= 0.3) return COLORS.danger;
  if (ratio <= 0.6) return COLORS.warning;
  return COLORS.primary;
}

export default function OpinionScale({
  value,
  onChange,
  min = 1,
  max = 10,
  lowLabel = 'Not at all',
  highLabel = 'Very much',
}: Props) {
  const count = max - min + 1;

  return (
    <div style={{ width: '100%', padding: '16px 0' }}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
        {Array.from({ length: count }, (_, i) => {
          const n = min + i;
          const selected = value === n;
          const color = getScaleColor(n, max);
          return (
            <motion.button
              key={n}
              onClick={() => onChange(n)}
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
              {n}
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
