import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../../lib/constants';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export default function LongTextInput({
  value,
  onChange,
  placeholder = 'Type your answer here...',
  maxLength,
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div style={{ width: '100%', padding: '8px 0' }}>
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={3}
        style={{
          width: '100%',
          padding: '0',
          border: 'none',
          borderBottom: `1.5px solid ${focused ? COLORS.primary : COLORS.border}`,
          borderRadius: 0,
          fontSize: 16,
          fontWeight: 500,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          color: COLORS.text,
          background: 'transparent',
          outline: 'none',
          resize: 'none',
          lineHeight: 1.6,
          overflow: 'hidden',
        }}
      />
      <motion.div
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        style={{
          height: 2,
          background: COLORS.primary,
          transformOrigin: 'left',
        }}
      />
      {maxLength && (
        <div style={{
          marginTop: 6,
          fontSize: 12,
          color: COLORS.subtle,
          textAlign: 'right',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
}
