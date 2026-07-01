import { useState } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../../lib/constants';

interface Props {
  value: number;
  max?: number;
  onChange: (value: number) => void;
}

export default function RatingInput({ value, max = 5, onChange }: Props) {
  const [hovered, setHovered] = useState(0);

  return (
    <div
      style={{ display: 'flex', gap: 12, padding: '16px 0' }}
      onMouseLeave={() => setHovered(0)}
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const filled = starValue <= (hovered || value);
        return (
          <motion.button
            key={i}
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHovered(starValue)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`${starValue} star${starValue > 1 ? 's' : ''}`}
            style={{
              width: 48,
              height: 48,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill={filled ? COLORS.accent : 'none'}
                stroke={filled ? COLORS.accent : COLORS.border}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        );
      })}
    </div>
  );
}
