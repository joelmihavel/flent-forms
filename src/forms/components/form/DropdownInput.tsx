import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SelectOption } from '../../schema/types';
import { COLORS } from '../../lib/constants';

interface Props {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function DropdownInput({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label || '';

  const filtered = search
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', padding: '8px 0' }}>
      <button
        type="button"
        onClick={() => { setOpen(!open); setSearch(''); }}
        style={{
          width: '100%',
          height: 52,
          padding: '0 40px 0 0',
          border: 'none',
          borderBottom: `1.5px solid ${open ? COLORS.primary : COLORS.border}`,
          background: 'transparent',
          fontSize: 16,
          fontWeight: 500,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          color: value ? COLORS.text : COLORS.subtle,
          textAlign: 'left',
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        {selectedLabel || placeholder}
      </button>
      <div style={{
        position: 'absolute',
        right: 0,
        top: 24,
        pointerEvents: 'none',
      }}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
        >
          <path d="M4 6L8 10L12 6" stroke={COLORS.muted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              top: 60,
              left: 0,
              right: 0,
              background: '#fff',
              border: `1px solid ${COLORS.border}`,
              borderRadius: 16,
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              zIndex: 50,
              maxHeight: 280,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {options.length > 6 && (
              <div style={{ padding: '10px 14px 6px', borderBottom: `1px solid ${COLORS.border}` }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  style={{
                    width: '100%',
                    height: 34,
                    border: 'none',
                    outline: 'none',
                    fontSize: 14,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    color: COLORS.text,
                    background: 'transparent',
                  }}
                />
              </div>
            )}
            <div style={{ overflowY: 'auto', maxHeight: 230, padding: '4px 0' }}>
              {filtered.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  style={{
                    width: '100%',
                    padding: '10px 16px',
                    background: opt.value === value ? COLORS.pastelGreen : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: opt.value === value ? 600 : 400,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    color: opt.value === value ? COLORS.primary : COLORS.text,
                    textAlign: 'left',
                  }}
                >
                  {opt.label}
                </button>
              ))}
              {filtered.length === 0 && (
                <div style={{ padding: '12px 16px', fontSize: 13, color: COLORS.muted }}>
                  No options match
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
