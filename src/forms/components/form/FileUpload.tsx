

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { FileUploadConfig } from '../../schema/types';
import type { UploadedFile } from '../../types/form';
import { uploadFile, runOCR } from '../../lib/api';
import { COLORS } from '../../lib/constants';
import Button from '../ui/Button';
import Alert from '../ui/Alert';

interface Props {
  config: FileUploadConfig;
  value: UploadedFile | null;
  onChange: (file: UploadedFile | null) => void;
  onOCR?: (result: Record<string, string>) => void;
}

export default function FileUpload({ config, value, onChange, onOCR }: Props) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [ocrStatus, setOcrStatus] = useState<'idle' | 'running' | 'done'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!config.accept.includes(ext)) {
      setError(`Invalid file type. Accepted: ${config.accept.join(', ')}`);
      return;
    }
    if (file.size > config.maxSizeMB * 1024 * 1024) {
      setError(`File too large. Maximum size: ${config.maxSizeMB}MB`);
      return;
    }
    setUploading(true);
    setProgress(0);
    try {
      const result = await uploadFile(file, setProgress);
      const uploaded: UploadedFile = {
        id: result.id,
        name: file.name,
        size: file.size,
        type: file.type,
        url: result.url,
        uploadedAt: new Date().toISOString(),
      };
      onChange(uploaded);
      if (config.ocrEnabled && onOCR) {
        setOcrStatus('running');
        try {
          const ocrResult = await runOCR(result.url);
          onOCR(ocrResult as unknown as Record<string, string>);
          setOcrStatus('done');
        } catch {
          setOcrStatus('idle');
        }
      }
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  }, [config, onChange, onOCR]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  if (value && !uploading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%' }}
      >
        <div style={{
          padding: '20px 24px',
          background: COLORS.pastelGreen,
          borderRadius: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: 'rgba(0,142,117,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            flexShrink: 0,
          }}>
            {value.type.includes('pdf') ? '📄' : '🖼️'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {value.name}
            </div>
            <div style={{ fontSize: 12, color: COLORS.primary, marginTop: 2, fontWeight: 500 }}>
              Uploaded · {(value.size / 1024).toFixed(0)} KB
            </div>
          </div>
          <motion.button
            onClick={() => onChange(null)}
            whileHover={{ scale: 1.1, background: '#fff' }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: 'none',
              background: 'rgba(0,0,0,0.06)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              color: COLORS.muted,
            }}
          >
            ✕
          </motion.button>
        </div>

        {ocrStatus === 'running' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: 12 }}>
            <Alert type="info" title="Extracting details..." message="We're reading your document automatically." />
          </motion.div>
        )}
        {ocrStatus === 'done' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: 12 }}>
            <Alert type="success" title="Details extracted" message="We've auto-filled some fields from your document." />
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <motion.div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        whileHover={{ borderColor: COLORS.primary, background: 'rgba(0,142,117,0.03)' }}
        animate={{
          borderColor: dragging ? COLORS.primary : COLORS.border,
          background: dragging ? COLORS.pastelGreen : '#fff',
        }}
        style={{
          padding: '40px 24px',
          border: `2px dashed ${COLORS.border}`,
          borderRadius: 16,
          cursor: 'pointer',
          textAlign: 'center',
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={config.accept.join(',')}
          onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
          style={{ display: 'none' }}
        />

        {uploading ? (
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: COLORS.text, marginBottom: 12 }}>
              Uploading... {progress}%
            </div>
            <div style={{ height: 4, background: COLORS.border, borderRadius: 2, overflow: 'hidden' }}>
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
                style={{ height: '100%', background: COLORS.primary, borderRadius: 2 }}
              />
            </div>
          </div>
        ) : (
          <>
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              style={{ fontSize: 36, marginBottom: 12 }}
            >
              📎
            </motion.div>
            <div style={{ fontSize: 15, fontWeight: 500, color: COLORS.text }}>
              {config.label}
            </div>
            <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 6 }}>
              {config.description || 'Drag & drop or click to browse'}
            </div>
            <div style={{ fontSize: 12, color: COLORS.subtle, marginTop: 8 }}>
              {config.accept.join(', ')} · Max {config.maxSizeMB}MB
            </div>
          </>
        )}
      </motion.div>

      {error && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 12 }}>
          <Alert type="error" title="Upload Error" message={error} />
          <div style={{ marginTop: 8 }}>
            <Button variant="secondary" size="sm" label="Try Again" onClick={() => { setError(null); inputRef.current?.click(); }} />
          </div>
        </motion.div>
      )}
    </div>
  );
}
