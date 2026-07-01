

import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../../lib/constants';

interface ButtonProps {
  variant?: 'primary' | 'accent' | 'cta' | 'secondary' | 'danger' | 'soft';
  size?: 'sm' | 'md' | 'lg';
  label: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  icon?: React.ReactNode;
  loading?: boolean;
}

const variantStyles: Record<string, React.CSSProperties> = {
  primary: { background: COLORS.primary, color: '#fff', border: 'none' },
  accent: { background: COLORS.accent, color: COLORS.text, border: 'none' },
  cta: { background: COLORS.text, color: '#fff', border: '1px solid #FFFFFF', boxShadow: '-3px 3px 0px 0px rgba(0,0,0,1)' },
  secondary: { background: 'transparent', color: COLORS.text, border: `1.5px solid ${COLORS.text}` },
  danger: { background: COLORS.danger, color: '#fff', border: 'none' },
  soft: { background: COLORS.pastelGreen, color: COLORS.primary, border: 'none' },
};

const hoverVariants = {
  primary: { scale: 1.015, boxShadow: '0 4px 16px rgba(0,142,117,0.3)' },
  accent: { scale: 1.015, boxShadow: '0 4px 16px rgba(255,154,109,0.3)' },
  cta: { scale: 1.02, boxShadow: '-4px 4px 0px 0px rgba(0,0,0,1)' },
  secondary: { scale: 1.015 },
  danger: { scale: 1.015, boxShadow: '0 4px 16px rgba(198,71,71,0.3)' },
  soft: { scale: 1.015 },
} as const;

const sizeStyles: Record<string, { height: number; fontSize: number; padding: string }> = {
  sm: { height: 36, fontSize: 13, padding: '0 16px' },
  md: { height: 44, fontSize: 14, padding: '0 24px' },
  lg: { height: 52, fontSize: 16, padding: '0 32px' },
};

export default function Button({
  variant = 'primary',
  size = 'md',
  label,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  icon,
  loading = false,
}: ButtonProps) {
  const vs = variantStyles[variant];
  const ss = sizeStyles[size];

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={disabled ? {} : hoverVariants[variant]}
      whileTap={disabled ? {} : { scale: 0.97 }}
      style={{
        ...vs,
        height: ss.height,
        fontSize: ss.fontSize,
        padding: ss.padding,
        borderRadius: 16,
        fontWeight: 600,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        width: fullWidth ? '100%' : 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        outline: 'none',
        ...(disabled ? { background: '#E8E8E5', color: '#BABABA', border: '1px solid #DDDDD9', boxShadow: 'none' } : {}),
      }}
    >
      {loading ? (
        <span style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
      ) : icon}
      {label}
    </motion.button>
  );
}
