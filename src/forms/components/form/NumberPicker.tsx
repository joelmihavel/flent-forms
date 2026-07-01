

import { COLORS } from '../../lib/constants';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export default function NumberPicker({ value, min = 1, max = 10, onChange }: Props) {
  const canDecrement = value > min;
  const canIncrement = value < max;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32, padding: '24px 0' }}>
      <motion.button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={!canDecrement}
        aria-label="Decrease"
        whileHover={canDecrement ? { scale: 1.08, boxShadow: '0 2px 8px rgba(0,142,117,0.15)' } : {}}
        whileTap={canDecrement ? { scale: 0.92 } : {}}
        style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          border: `1.5px solid ${canDecrement ? COLORS.primary : COLORS.border}`,
          background: canDecrement ? '#fff' : '#F5F5F3',
          fontSize: 22,
          fontWeight: 600,
          color: canDecrement ? COLORS.primary : COLORS.subtle,
          cursor: canDecrement ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          transition: 'all 0.15s ease',
        }}
      >
        −
      </motion.button>

      <div style={{
        position: 'relative',
        overflow: 'hidden',
        minWidth: 80,
        textAlign: 'center',
      }}>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: COLORS.text,
              fontFamily: "'Zin Display Condensed', 'Plus Jakarta Sans', sans-serif",
              lineHeight: 1,
              display: 'block',
              letterSpacing: '-0.02em',
            }}
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>

      <motion.button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={!canIncrement}
        aria-label="Increase"
        whileHover={canIncrement ? { scale: 1.08, boxShadow: '0 2px 8px rgba(0,142,117,0.15)' } : {}}
        whileTap={canIncrement ? { scale: 0.92 } : {}}
        style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          border: `1.5px solid ${canIncrement ? COLORS.primary : COLORS.border}`,
          background: canIncrement ? '#fff' : '#F5F5F3',
          fontSize: 22,
          fontWeight: 600,
          color: canIncrement ? COLORS.primary : COLORS.subtle,
          cursor: canIncrement ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          transition: 'all 0.15s ease',
        }}
      >
        +
      </motion.button>
    </div>
  );
}
