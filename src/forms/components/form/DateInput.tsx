import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../../lib/constants';

interface Props {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function DateInput({ value, onChange, label }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const formatted = value
    ? new Date(value).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <div style={{ width: '100%', padding: '8px 0' }}>
      {label && (
        <motion.label
          animate={{
            fontSize: 12,
            fontWeight: 600,
            color: focused ? COLORS.primary : COLORS.muted,
          }}
          style={{
            display: 'block',
            marginBottom: 6,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          {label}
        </motion.label>
      )}
      <div style={{ position: 'relative' }}>
        <input
          ref={inputRef}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            height: 52,
            padding: '0',
            border: 'none',
            borderBottom: `1.5px solid ${focused ? COLORS.primary : COLORS.border}`,
            borderRadius: 0,
            fontSize: 16,
            fontWeight: 500,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: value ? COLORS.text : COLORS.subtle,
            background: 'transparent',
            outline: 'none',
            cursor: 'pointer',
          }}
        />
        <motion.div
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: COLORS.primary,
            transformOrigin: 'left',
          }}
        />
      </div>
      {formatted && (
        <div style={{
          marginTop: 8,
          fontSize: 13,
          color: COLORS.primary,
          fontWeight: 500,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
          {formatted}
        </div>
      )}
    </div>
  );
}
