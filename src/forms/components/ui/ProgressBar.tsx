

import { COLORS } from '../../lib/constants';

interface ProgressBarProps {
  steps: number;
  current: number;
}

export default function ProgressBar({ steps, current }: ProgressBarProps) {
  return (
    <div style={{ display: 'flex', gap: 3, width: '100%' }}>
      {Array.from({ length: steps }, (_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: 3,
            borderRadius: 2,
            background: i < current ? COLORS.text : COLORS.border,
            transition: 'background 0.3s ease',
          }}
        />
      ))}
    </div>
  );
}
