

import { useState, useRef, useEffect, useCallback } from 'react';
import { sendOTP, verifyOTP } from '../../lib/api';
import { COLORS } from '../../lib/constants';
import Button from '../ui/Button';
import Alert from '../ui/Alert';

interface Props {
  phone: string;
  verified: boolean;
  onVerified: () => void;
}

export default function OTPVerification({ phone, verified, onVerified }: Props) {
  const [otpId, setOtpId] = useState('');
  const [code, setCode] = useState(['', '', '', '']);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const startResendTimer = useCallback(() => {
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) { clearInterval(interval); return 0; }
        return t - 1;
      });
    }, 1000);
  }, []);

  const handleSendOTP = useCallback(async () => {
    setSending(true);
    setError('');
    try {
      const result = await sendOTP(phone);
      setOtpId(result.otpId);
      startResendTimer();
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch {
      setError('Failed to send OTP');
    } finally {
      setSending(false);
    }
  }, [phone, startResendTimer]);

  useEffect(() => {
    if (phone && !verified && !otpId) {
      handleSendOTP();
    }
  }, [phone, verified, otpId, handleSendOTP]);

  const handleDigit = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    const full = newCode.join('');
    if (full.length === 4) {
      handleVerify(full);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (otp: string) => {
    setVerifying(true);
    setError('');
    try {
      const result = await verifyOTP(otpId, otp);
      if (result.verified) {
        onVerified();
      } else {
        setError('Invalid OTP. Hint: use 1234');
        setCode(['', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch {
      setError('Verification failed');
    } finally {
      setVerifying(false);
    }
  };

  if (verified) {
    return <Alert type="success" title="Phone Verified" message={`+91 ${phone} has been verified successfully.`} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center', width: '100%' }}>
      <div style={{ fontSize: 14, color: COLORS.muted, textAlign: 'center' }}>
        Enter the OTP sent to <span style={{ fontWeight: 600, color: COLORS.text }}>+91 {phone}</span>
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        {code.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleDigit(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            style={{
              width: 52,
              height: 56,
              textAlign: 'center',
              fontSize: 22,
              fontWeight: 600,
              border: `1.5px solid ${error ? COLORS.danger : digit ? COLORS.primary : COLORS.border}`,
              borderRadius: 16,
              outline: 'none',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: COLORS.text,
              transition: 'border-color 0.2s ease',
            }}
          />
        ))}
      </div>

      {verifying && (
        <div style={{ fontSize: 13, color: COLORS.primary, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 16, height: 16, border: '2px solid rgba(0,142,117,0.3)', borderTopColor: COLORS.primary, borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
          Verifying...
        </div>
      )}

      {error && <Alert type="error" title="Verification Failed" message={error} />}

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Button
          variant="secondary"
          size="sm"
          label={resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
          disabled={resendTimer > 0 || sending}
          loading={sending}
          onClick={handleSendOTP}
        />
      </div>

      <div style={{ fontSize: 12, color: COLORS.subtle }}>
        Hint: Use <span style={{ fontWeight: 600 }}>1234</span> as the OTP
      </div>
    </div>
  );
}
