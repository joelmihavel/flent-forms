

import { COLORS } from '../../lib/constants';

interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message?: string;
}

const alertStyles: Record<string, { bg: string; border: string; icon: string; iconBg: string }> = {
  success: { bg: COLORS.pastelGreen, border: COLORS.success, icon: '✓', iconBg: COLORS.success },
  error: { bg: COLORS.pastelRed, border: COLORS.danger, icon: '✕', iconBg: COLORS.danger },
  warning: { bg: COLORS.pastelYellow, border: COLORS.warning, icon: '!', iconBg: COLORS.warning },
  info: { bg: COLORS.pastelCyan, border: COLORS.info, icon: 'i', iconBg: COLORS.info },
};

export default function Alert({ type = 'info', title, message }: AlertProps) {
  const s = alertStyles[type];
  return (
    <div style={{
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      padding: '14px 16px',
      background: s.bg,
      borderLeft: `3px solid ${s.border}`,
      borderRadius: 16,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <div style={{
        width: 22,
        height: 22,
        borderRadius: '50%',
        background: s.iconBg,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        fontWeight: 700,
        flexShrink: 0,
        marginTop: 1,
      }}>
        {s.icon}
      </div>
      <div>
        {title && <div style={{ fontSize: 14, fontWeight: 600, color: '#15102E' }}>{title}</div>}
        {message && <div style={{ fontSize: 13, color: '#15102E', opacity: 0.75, marginTop: 2 }}>{message}</div>}
      </div>
    </div>
  );
}
