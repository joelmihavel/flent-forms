

import type { FormStep } from '../../schema/types';
import { COLORS } from '../../lib/constants';
import { motion } from 'framer-motion';

interface Props {
  step: FormStep;
  onNext: () => void;
}

const DOC_COLORS = [COLORS.pastelCyan, COLORS.pastelOrange, COLORS.pastelViolet, COLORS.pastelYellow, COLORS.pastelPink, COLORS.pastelGreen];
const DOC_ICONS = ['📄', '📋', '🏦', '⚡', '🔧', '📦'];

export default function WelcomeScreen({ step, onNext }: Props) {
  const time = step.meta?.estimatedTime as string;
  const overline = (step.meta?.overline as string) || '';
  const ctaLabel = (step.meta?.ctaLabel as string) || 'Get Started';
  const documentsRequired = step.meta?.documentsRequired as string[] | undefined;
  const docs = documentsRequired?.length
    ? documentsRequired.map((label, i) => ({
        label,
        icon: DOC_ICONS[i % DOC_ICONS.length],
        color: DOC_COLORS[i % DOC_COLORS.length],
      }))
    : [];

  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      background: COLORS.bg,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background landscape */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '2048 / 768' }}>
          <img src="/forms/cover-bg.png" alt="" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'fill', opacity: 0.18 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(252,251,247,1) 0%, rgba(252,251,247,0) 40%)' }} />
        </div>
      </div>

      {/* Nav bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'clamp(16px, 3vw, 24px) clamp(20px, 4vw, 40px)',
        }}
      >
        <img src="/forms/flent-wordmark.svg" alt="flent" width={60} height={22} style={{ objectFit: 'contain' }} />
        {time && (
          <div style={{ fontSize: 13, color: COLORS.muted, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke={COLORS.subtle} strokeWidth="1.2" />
              <path d="M7 4V7.5L9 9" stroke={COLORS.subtle} strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            {time}
          </div>
        )}
      </motion.div>

      {/* Main content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(20px, 4vw, 40px)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ width: '100%', maxWidth: 640, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              background: COLORS.pastelGreen,
              borderRadius: 200,
              fontSize: 12,
              fontWeight: 600,
              color: COLORS.primary,
              letterSpacing: '0.02em',
              marginBottom: 28,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: COLORS.primary }} />
            {overline || 'Homeowner Onboarding'}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              fontSize: 'clamp(36px, 8vw, 56px)',
              fontWeight: 500,
              color: COLORS.text,
              margin: '0 0 16px',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              textAlign: 'center',
              fontFamily: "'Zin Display Condensed', 'Plus Jakarta Sans', sans-serif",
            }}
          >
            {step.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              fontSize: 'clamp(14px, 2.5vw, 17px)',
              color: COLORS.muted,
              margin: '0 0 40px',
              lineHeight: 1.65,
              textAlign: 'center',
              maxWidth: 480,
            }}
          >
            {step.subtitle}
          </motion.p>

          {/* Document pills */}
          {docs.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 48 }}>
            {docs.map((doc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.35 }}
                whileHover={{ y: -3, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 18px 10px 12px',
                  background: '#fff',
                  borderRadius: 200,
                  border: `1px solid ${COLORS.border}`,
                  fontSize: 13,
                  fontWeight: 500,
                  color: COLORS.text,
                  cursor: 'default',
                }}
              >
                <div style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: doc.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  flexShrink: 0,
                }}>
                  {doc.icon}
                </div>
                {doc.label}
              </motion.div>
            ))}
          </div>}

          {/* CTA */}
          <motion.button
            onClick={onNext}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            whileHover={{ scale: 1.03, boxShadow: '-4px 4px 0px 0px rgba(0,0,0,1)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              height: 56,
              padding: '0 48px',
              background: COLORS.text,
              color: '#fff',
              border: '1px solid #fff',
              borderRadius: 16,
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              boxShadow: '-3px 3px 0px 0px rgba(0,0,0,1)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            {ctaLabel}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            style={{ marginTop: 16, fontSize: 12, color: COLORS.subtle }}
          >
            or press <span style={{ fontWeight: 600, color: COLORS.muted }}>Enter ↵</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
