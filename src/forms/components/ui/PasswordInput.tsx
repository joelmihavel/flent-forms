

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../../lib/constants';

interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  autoFocus?: boolean;
}

export default function PasswordInput({
  label,
  placeholder = '',
  value = '',
  error = false,
  errorMessage,
  disabled = false,
  onChange,
  onBlur,
  onKeyDown,
  autoFocus = false,
}: PasswordInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

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
              left: 0,
              pointerEvents: 'none',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              transformOrigin: 'left',
            }}
          >
            {label}
          </motion.label>
        )}
        <input
          ref={inputRef}
          type={visible ? 'text' : 'password'}
          placeholder={isLifted ? placeholder : ''}
          value={value}
          onChange={onChange}
          onBlur={() => { setFocused(false); onBlur?.(); }}
          onFocus={() => setFocused(true)}
          onKeyDown={onKeyDown}
          disabled={disabled}
          style={{
            height: 52,
            width: '100%',
            padding: '16px 40px 0 0',
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
          }}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setVisible((v) => !v)}
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-25%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            color: focused ? COLORS.primary : COLORS.muted,
            transition: 'color 0.2s ease',
          }}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2.5 10C2.5 10 5 4.5 10 4.5C15 4.5 17.5 10 17.5 10C17.5 10 15 15.5 10 15.5C5 15.5 2.5 10 2.5 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2.5 10C2.5 10 5 4.5 10 4.5C15 4.5 17.5 10 17.5 10C17.5 10 15 15.5 10 15.5C5 15.5 2.5 10 2.5 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
              <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
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
    </div>
  );
}
