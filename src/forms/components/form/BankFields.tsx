

import { useState, useEffect, useCallback } from 'react';
import type { FieldDefinition } from '../../schema/types';
import { lookupIFSC } from '../../lib/api';
import { PATTERNS, COLORS } from '../../lib/constants';
import FieldGroup from './FieldGroup';
import Alert from '../ui/Alert';

interface Props {
  fields: FieldDefinition[];
  values: Record<string, string>;
  errors: Record<string, string>;
  onChange: (name: string, value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export default function BankFields({ fields, values, errors, onChange, onKeyDown }: Props) {
  const [lookingUp, setLookingUp] = useState(false);
  const [lookupDone, setLookupDone] = useState(false);

  const ifscValue = values.ifscCode || '';

  const doLookup = useCallback(async (ifsc: string) => {
    setLookingUp(true);
    try {
      const info = await lookupIFSC(ifsc);
      onChange('bankName', info.bank);
      onChange('branchName', info.branch);
      setLookupDone(true);
    } catch {
      // silently fail
    } finally {
      setLookingUp(false);
    }
  }, [onChange]);

  useEffect(() => {
    if (PATTERNS.IFSC.test(ifscValue.toUpperCase()) && !lookupDone) {
      doLookup(ifscValue.toUpperCase());
    }
  }, [ifscValue, lookupDone, doLookup]);

  const handleChange = (name: string, value: string) => {
    if (name === 'ifscCode') {
      const upper = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 11);
      onChange(name, upper);
      if (upper !== ifscValue) setLookupDone(false);
    } else if (name === 'accountNumber' || name === 'confirmAccountNumber') {
      onChange(name, value.replace(/\D/g, ''));
    } else {
      onChange(name, value);
    }
  };

  const readOnlyFields = lookupDone ? ['bankName', 'branchName'] : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
      <FieldGroup
        fields={fields}
        values={values}
        errors={errors}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        readOnlyFields={readOnlyFields}
      />
      {lookingUp && (
        <div style={{ fontSize: 13, color: COLORS.primary, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 14, height: 14, border: '2px solid rgba(0,142,117,0.3)', borderTopColor: COLORS.primary, borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
          Looking up bank details...
        </div>
      )}
      {lookupDone && (
        <Alert type="success" title="Bank identified" message={`${values.bankName} — ${values.branchName}`} />
      )}
    </div>
  );
}
