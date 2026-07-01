

import { useState, useRef, useEffect } from 'react';
import { COLORS } from '../../lib/constants';

interface CountryCode {
  code: string;
  dial: string;
  flag: string;
  format: string;
  maxDigits: number;
}

const COUNTRIES: CountryCode[] = [
  { code: 'IN', dial: '+91', flag: '🇮🇳', format: 'XXXXX XXXXX', maxDigits: 10 },
  { code: 'US', dial: '+1', flag: '🇺🇸', format: '(XXX) XXX-XXXX', maxDigits: 10 },
  { code: 'GB', dial: '+44', flag: '🇬🇧', format: 'XXXX XXXXXX', maxDigits: 10 },
  { code: 'AE', dial: '+971', flag: '🇦🇪', format: 'XX XXX XXXX', maxDigits: 9 },
  { code: 'SG', dial: '+65', flag: '🇸🇬', format: 'XXXX XXXX', maxDigits: 8 },
  { code: 'AU', dial: '+61', flag: '🇦🇺', format: 'XXX XXX XXX', maxDigits: 9 },
  { code: 'CA', dial: '+1', flag: '🇨🇦', format: '(XXX) XXX-XXXX', maxDigits: 10 },
  { code: 'DE', dial: '+49', flag: '🇩🇪', format: 'XXXX XXXXXXX', maxDigits: 11 },
];

function formatPhone(raw: string, format: string): string {
  const digits = raw.replace(/\D/g, '');
  let result = '';
  let di = 0;
  for (let i = 0; i < format.length && di < digits.length; i++) {
    if (format[i] === 'X') {
      result += digits[di++];
    } else {
      result += format[i];
    }
  }
  return result;
}

function validatePhone(digits: string, country: CountryCode): string | null {
  if (!digits) return null;
  if (digits.length < country.maxDigits) return `Phone number must be ${country.maxDigits} digits`;
  if (country.code === 'IN' && !/^[6-9]/.test(digits)) return 'Indian numbers must start with 6-9';
  return null;
}

interface Props {
  label?: string;
  value: string;
  countryCode?: string;
  onChange: (phone: string, countryDial: string) => void;
  error?: string;
  autoFocus?: boolean;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export default function PhoneInput({
  label,
  value = '',
  countryCode = 'IN',
  onChange,
  error: externalError,
  autoFocus = false,
  onKeyDown,
}: Props) {
  const [selectedCountry, setSelectedCountry] = useState(() =>
    COUNTRIES.find(c => c.code === countryCode) || COUNTRIES[0]
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const rawDigits = value.replace(/\D/g, '');
  const displayValue = formatPhone(rawDigits, selectedCountry.format);
  const inlineError = touched ? validatePhone(rawDigits, selectedCountry) : null;
  const errorMsg = externalError || inlineError;

  useEffect(() => {
    if (autoFocus && inputRef.current) inputRef.current.focus();
  }, [autoFocus]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const digits = input.replace(/\D/g, '').slice(0, selectedCountry.maxDigits);
    onChange(digits, selectedCountry.dial);
  };

  const handleBlur = () => {
    setFocused(false);
    if (rawDigits.length > 0) setTouched(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div>
        {label && (
          <label style={{
            fontSize: 12,
            fontWeight: 600,
            color: errorMsg ? COLORS.danger : focused ? COLORS.primary : COLORS.muted,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            display: 'block',
            marginBottom: 6,
            transition: 'color 0.2s ease',
          }}>
            {label}
          </label>
        )}
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }} ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-label={`Country code: ${selectedCountry.dial}`}
            style={{
              height: 36,
              padding: '0 10px 0 0',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
              color: COLORS.text,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              outline: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 18 }}>{selectedCountry.flag}</span>
            <span style={{ fontSize: 16, fontWeight: 500 }}>{selectedCountry.dial}</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ marginLeft: 2, transition: 'transform 0.15s', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
              <path d="M1 1L5 5L9 1" stroke={COLORS.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div style={{
            width: 1,
            height: 20,
            background: COLORS.border,
            flexShrink: 0,
            marginRight: 10,
          }} />

          <input
            ref={inputRef}
            type="tel"
            inputMode="numeric"
            value={displayValue}
            placeholder={selectedCountry.format.replace(/X/g, '0')}
            onChange={handleInput}
            onFocus={() => setFocused(true)}
            onBlur={handleBlur}
            onKeyDown={onKeyDown}
            aria-label={label || 'Phone number'}
            style={{
              height: 36,
              width: '100%',
              padding: 0,
              border: 'none',
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: '0.5px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: COLORS.text,
              background: 'transparent',
              outline: 'none',
            }}
          />
        </div>
        <div style={{
          height: 1.5,
          background: errorMsg ? COLORS.danger : focused ? COLORS.primary : COLORS.border,
          transition: 'background 0.2s ease',
          marginTop: 2,
        }} />

        {dropdownOpen && (
          <div style={{
            position: 'absolute',
            top: 40,
            left: 0,
            width: 220,
            background: '#fff',
            border: `1px solid ${COLORS.border}`,
            borderRadius: 12,
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
            zIndex: 50,
            maxHeight: 240,
            overflowY: 'auto',
            padding: '4px 0',
            marginTop: 4,
          }}>
            {COUNTRIES.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  setSelectedCountry(c);
                  setDropdownOpen(false);
                  setTouched(false);
                  const digits = rawDigits.slice(0, c.maxDigits);
                  onChange(digits, c.dial);
                  inputRef.current?.focus();
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 14px',
                  background: c.code === selectedCountry.code ? COLORS.pastelGreen : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: COLORS.text,
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: 18 }}>{c.flag}</span>
                <span style={{ fontWeight: 500 }}>{c.dial}</span>
                <span style={{ color: COLORS.muted, fontSize: 12, marginLeft: 'auto' }}>{c.code}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      {errorMsg && (
        <span style={{ fontSize: 12, color: COLORS.danger, fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: 6 }}>
          {errorMsg}
        </span>
      )}
    </div>
  );
}
