import { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../../lib/constants';
import Button from '../ui/Button';

export default function SuccessScreen() {
  const fireConfetti = useCallback(() => {
    // Skip confetti in preview mode - canvas-confetti may not be available
  }, []);

  useEffect(() => {
    const timer = setTimeout(fireConfetti, 400);
    return () => clearTimeout(timer);
  }, [fireConfetti]);

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
          <img src="/forms/cover-bg.png" alt="" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'fill', opacity: 0.25 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(252,251,247,1) 0%, rgba(252,251,247,0) 35%)' }} />
        </div>
      </div>

      {/* Nav */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: 'clamp(16px, 3vw, 24px) clamp(24px, 5vw, 48px)',
      }}>
        <img src="/forms/flent-wordmark.svg" alt="flent" width={56} height={20} style={{ objectFit: 'contain' }} />
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(24px, 5vw, 48px)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ width: '100%', maxWidth: 480, textAlign: 'center' }}>
          {/* Checkmark */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #CFF0E9 0%, #D5F7F3 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 40px',
              boxShadow: '0 0 0 12px rgba(0,142,117,0.06), 0 0 0 24px rgba(0,142,117,0.03)',
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path
                d="M10 20L17 27L30 13"
                stroke={COLORS.primary}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ strokeDasharray: 30, animation: 'check-draw 0.5s ease 0.5s forwards', strokeDashoffset: 30 }}
              />
            </svg>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              fontSize: 'clamp(32px, 7vw, 48px)',
              fontWeight: 500,
              color: COLORS.text,
              margin: '0 0 16px',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              fontFamily: "'Zin Display Condensed', 'Plus Jakarta Sans', sans-serif",
            }}
          >
            You&apos;re all set!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={{
              fontSize: 'clamp(15px, 3vw, 18px)',
              color: COLORS.muted,
              margin: '0 0 48px',
              lineHeight: 1.6,
            }}
          >
            Welcome aboard. We&apos;ll take it from here.
          </motion.p>

          {/* Done button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.4 }}
          >
            <Button
              variant="cta"
              label="Done"
              size="lg"
              fullWidth
              onClick={() => { window.location.href = '/'; }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
