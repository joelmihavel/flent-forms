import { motion } from 'framer-motion';
import { COLORS } from '../../lib/constants';

interface Props {
  items: string[];
  checkedItems: string[];
  onChange: (items: string[]) => void;
}

export default function CheckboxAcknowledge({ items, checkedItems, onChange }: Props) {
  const toggle = (item: string) => {
    if (checkedItems.includes(item)) {
      onChange(checkedItems.filter((i) => i !== item));
    } else {
      onChange([...checkedItems, item]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', padding: '8px 0' }}>
      {items.map((item, i) => {
        const checked = checkedItems.includes(item);
        return (
          <motion.label
            key={i}
            onClick={() => toggle(item)}
            whileHover={{ x: 4 }}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 14,
              cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              padding: '12px 16px',
              background: checked ? COLORS.pastelGreen : '#fff',
              borderRadius: 12,
              border: `1.5px solid ${checked ? COLORS.primary : COLORS.border}`,
              transition: 'all 0.15s ease',
            }}
          >
            <div style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              border: checked ? 'none' : `1.5px solid ${COLORS.border}`,
              background: checked ? COLORS.primary : '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: 1,
              transition: 'all 0.15s ease',
            }}>
              {checked && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7L6 10L11 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span style={{
              fontSize: 14,
              color: COLORS.text,
              lineHeight: 1.5,
            }}>
              {item}
            </span>
          </motion.label>
        );
      })}
    </div>
  );
}
