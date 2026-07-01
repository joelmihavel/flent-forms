

import type { FormData } from '../../types/form';
import { COLORS } from '../../lib/constants';

interface Props {
  data: FormData;
  consent: boolean;
  onConsentChange: (v: boolean) => void;
  onEdit: (stepIndex: number) => void;
}

function Section({ title, onEdit, children }: { title: string; onEdit?: () => void; children: React.ReactNode }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      border: `1px solid ${COLORS.border}`,
      overflow: 'hidden',
      marginBottom: 12,
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 20px',
        borderBottom: `1px solid ${COLORS.border}`,
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>{title}</span>
        {onEdit && (
          <button
            onClick={onEdit}
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: COLORS.primary,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Edit
          </button>
        )}
      </div>
      <div style={{ padding: '14px 20px' }}>{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 14 }}>
      <span style={{ color: COLORS.muted }}>{label}</span>
      <span style={{ color: COLORS.text, fontWeight: 500, textAlign: 'right', maxWidth: '60%' }}>{value}</span>
    </div>
  );
}

export default function ReviewScreen({ data, consent, onConsentChange, onEdit }: Props) {
  const roleMap: Record<string, string> = { owner: 'Owner', poc: 'Point of Contact', both: 'Both Owner & POC' };
  const roleLabel = roleMap[data.role] || '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
      <Section title="Role" onEdit={() => onEdit(1)}>
        <Field label="Your role" value={roleLabel} />
      </Section>

      {data.homeowners.map((ho, i) => (
        <Section key={i} title={`Homeowner ${i + 1}`} onEdit={() => onEdit(3)}>
          <Field label="Name" value={`${ho.firstName} ${ho.lastName}`} />
          <Field label="Phone" value={ho.phone ? `+91 ${ho.phone}` : ''} />
          <Field label="Email" value={ho.email} />
          <Field label="PAN" value={ho.pan} />
          <Field label="PAN Status" value={ho.panVerified ? `Verified — ${ho.panName}` : 'Not verified'} />
          <Field label="Aadhaar Front" value={ho.aadhaarFront?.name || 'Not uploaded'} />
          <Field label="Aadhaar Back" value={ho.aadhaarBack?.name || 'Not uploaded'} />
          <Field label="PAN Card" value={ho.panCard?.name || 'Not uploaded'} />
        </Section>
      ))}

      <Section title="Property Document" onEdit={() => onEdit(8)}>
        <Field label="Document" value={data.propertyDocument?.name || 'Not uploaded'} />
      </Section>

      {data.bankAccounts.map((ba, i) => (
        <Section key={i} title={`Bank Account ${i + 1}`} onEdit={() => onEdit(11)}>
          <Field label="Beneficiary" value={ba.beneficiaryName} />
          <Field label="Account" value={ba.accountNumber ? `****${ba.accountNumber.slice(-4)}` : ''} />
          <Field label="Bank" value={ba.bankName} />
          <Field label="IFSC" value={ba.ifscCode} />
          <Field label="Branch" value={ba.branchName} />
        </Section>
      ))}

      {data.role !== 'owner' && (
        <Section title="Point of Contact" onEdit={() => onEdit(12)}>
          <Field label="Name" value={`${data.poc.firstName} ${data.poc.lastName}`} />
          <Field label="Phone" value={data.poc.phone ? `+91 ${data.poc.phone}` : ''} />
          <Field label="Email" value={data.poc.email} />
        </Section>
      )}

      {(data.backupContact.firstName || data.backupContact.phone) && (
        <Section title="Backup Contact" onEdit={() => onEdit(13)}>
          <Field label="Name" value={`${data.backupContact.firstName} ${data.backupContact.lastName}`} />
          <Field label="Phone" value={data.backupContact.phone} />
          <Field label="Email" value={data.backupContact.email} />
        </Section>
      )}

      <div style={{ marginTop: 8 }}>
        <label
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
            cursor: 'pointer',
            fontSize: 14,
            color: COLORS.text,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
          onClick={() => onConsentChange(!consent)}
        >
          <div style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            border: consent ? 'none' : `1.5px solid ${COLORS.border}`,
            background: consent ? COLORS.primary : '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: 1,
            transition: 'all 0.15s ease',
          }}>
            {consent && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7L6 10L11 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span>I confirm that all the details provided above are correct and I authorize Flent Homes to process my information for onboarding.</span>
        </label>
      </div>
    </div>
  );
}
