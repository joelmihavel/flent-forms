

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../../lib/constants';

type OptionItem = string | { label: string; value: string };

interface SelectInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  options?: OptionItem[];
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  autoFocus?: boolean;
}

export default function SelectInput({
  label,
  placeholder = 'Select an option',
  value = '',
  options = [],
  helperText,
  error = false,
  errorMessage,
  disabled = false,
  onChange,
  onKeyDown,
  autoFocus = false,
}: SelectInputProps) {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [focused, setFocused] = React.useState(false);

  useEffect(() => {
    if (autoFocus && selectRef.current) {
      selectRef.current.focus();
    }
  }, [autoFocus]);

  const hasValue = value.length > 0;
  const isLifted = focused || hasValue;

  const normalizedOptions = options.map((opt) =>
    typeof opt === 'string' ? { label: opt, value: opt } : opt
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div style={{ position: 'relative' }}>
        {label && (
          <motion.label
            animate={{
              top: isLifted ? 0 : 16,
              fontSize: isLifted ? 12 : 15,
              fontWeight: isLifted ? 600 : 400,
              color: error ? COLORS.danger : focused ? COLORS.primary : COLORS.muted,
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: 0,
              pointerEvents: 'none',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              transformOrigin: 'left',
            }}
          >
            {label}
          </motion.label>
        )}
        <select
          ref={selectRef}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          onKeyDown={onKeyDown}
          disabled={disabled}
          style={{
            height: 52,
            width: '100%',
            padding: '16px 32px 0 0',
            border: 'none',
            borderBottom: `1.5px solid ${error ? COLORS.danger : focused ? COLORS.primary : COLORS.border}`,
            borderRadius: 0,
            fontSize: 16,
            fontWeight: 500,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: hasValue ? COLORS.text : COLORS.subtle,
            background: 'transparent',
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? 'not-allowed' : 'pointer',
            outline: 'none',
            transition: 'border-color 0.2s ease',
            appearance: 'none',
            WebkitAppearance: 'none',
          }}
        >
          <option value="" disabled hidden>
            {isLifted ? placeholder : ''}
          </option>
          {normalizedOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-25%)',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 6L8 10L12 6"
              stroke={focused ? COLORS.primary : COLORS.muted}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <motion.div
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: error ? COLORS.danger : COLORS.primary,
            transformOrigin: 'left',
          }}
        />
      </div>
      {error && errorMessage && (
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: 12, color: COLORS.danger, fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: 6 }}
        >
          {errorMessage}
        </motion.span>
      )}
      {!error && helperText && (
        <span style={{ fontSize: 12, color: COLORS.muted, fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: 6 }}>
          {helperText}
        </span>
      )}
    </div>
  );
}
