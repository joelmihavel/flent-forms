import { motion } from 'framer-motion';
import type { MatrixConfig } from '../../schema/types';
import { COLORS } from '../../lib/constants';

interface Props {
  config: MatrixConfig;
  values: Record<string, string>;
  onChange: (rowId: string, value: string) => void;
}

export default function MatrixInput({ config, values, onChange }: Props) {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 20, padding: '8px 0' }}>
      {config.rows.map((row) => {
        const selected = values[row.id] || '';
        return (
          <div key={row.id}>
            <div style={{
              fontSize: 14,
              fontWeight: 600,
              color: COLORS.text,
              marginBottom: 10,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              {row.label}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {config.columns.map((col) => {
                const isSelected = selected === col.value;
                return (
                  <motion.button
                    key={col.value}
                    onClick={() => onChange(row.id, col.value)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      background: isSelected ? COLORS.primary : '#fff',
                      borderColor: isSelected ? COLORS.primary : COLORS.border,
                      color: isSelected ? '#fff' : COLORS.text,
                    }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 200,
                      border: `1.5px solid ${COLORS.border}`,
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: 'pointer',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {col.label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
