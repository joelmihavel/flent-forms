

import { useState, useCallback } from 'react';
import Input from '../ui/Input';
import Alert from '../ui/Alert';
import { verifyPAN } from '../../lib/api';
import { COLORS } from '../../lib/constants';
import { PATTERNS } from '../../lib/constants';

interface Props {
  value: string;
  verified: boolean;
  panName: string;
  onChange: (pan: string) => void;
  onVerified: (name: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  error?: string;
}

export default function PANInput({ value, verified, panName, onChange, onVerified, onKeyDown, error }: Props) {
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState('');

  const handleVerify = useCallback(async () => {
    if (!PATTERNS.PAN.test(value)) return;
    setVerifying(true);
    setVerifyError('');
    try {
      const result = await verifyPAN(value);
      if (result.valid) {
        onVerified(result.name);
      } else {
        setVerifyError('PAN could not be verified');
      }
    } catch {
      setVerifyError('Verification service unavailable');
    } finally {
      setVerifying(false);
    }
  }, [value, onVerified]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    onChange(val);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
      <Input
        label="PAN Number"
        placeholder="e.g. ABCDE1234F"
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        error={!!error}
        errorMessage={error}
        autoFocus
        maxLength={10}
      />

      {value.length === 10 && PATTERNS.PAN.test(value) && !verified && (
        <button
          onClick={handleVerify}
          disabled={verifying}
          style={{
            padding: '10px 16px',
            background: COLORS.pastelGreen,
            color: COLORS.primary,
            border: 'none',
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {verifying && (
            <span style={{ width: 14, height: 14, border: '2px solid rgba(0,142,117,0.3)', borderTopColor: COLORS.primary, borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
          )}
          {verifying ? 'Verifying...' : 'Verify PAN'}
        </button>
      )}

      {verified && (
        <Alert type="success" title="PAN Verified" message={`Name on PAN: ${panName}`} />
      )}

      {verifyError && (
        <Alert type="error" title="Verification Failed" message={verifyError} />
      )}
    </div>
  );
}
