

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../../lib/constants';

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number';
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  autoFocus?: boolean;
  prefix?: string;
  readOnly?: boolean;
  maxLength?: number;
  style?: React.CSSProperties;
}

export default function Input({
  label,
  placeholder = '',
  value = '',
  type = 'text',
  helperText,
  error = false,
  errorMessage,
  disabled = false,
  onChange,
  onBlur,
  onKeyDown,
  autoFocus = false,
  prefix,
  readOnly = false,
  maxLength,
  style,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = React.useState(false);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const hasValue = value.length > 0;
  const isLifted = focused || hasValue;

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
              left: prefix ? 40 : 0,
              pointerEvents: 'none',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              transformOrigin: 'left',
            }}
          >
            {label}
          </motion.label>
        )}
        {prefix && (
          <div style={{
            position: 'absolute',
            left: 0,
            bottom: 12,
            display: 'flex',
            alignItems: 'center',
            fontSize: 16,
            fontWeight: 500,
            color: focused ? COLORS.text : COLORS.muted,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            transition: 'color 0.2s ease',
            zIndex: 1,
          }}>
            {prefix}
          </div>
        )}
        <input
          ref={inputRef}
          type={type}
          placeholder={isLifted ? placeholder : ''}
          value={value}
          onChange={onChange}
          onBlur={() => { setFocused(false); onBlur?.(); }}
          onFocus={() => setFocused(true)}
          onKeyDown={onKeyDown}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          style={{
            height: 52,
            width: '100%',
            padding: prefix ? '16px 0 0 40px' : '16px 0 0 0',
            border: 'none',
            borderBottom: `1.5px solid ${error ? COLORS.danger : focused ? COLORS.primary : COLORS.border}`,
            borderRadius: 0,
            fontSize: 16,
            fontWeight: 500,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: COLORS.text,
            background: 'transparent',
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? 'not-allowed' : 'text',
            outline: 'none',
            transition: 'border-color 0.2s ease',
            ...style,
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
