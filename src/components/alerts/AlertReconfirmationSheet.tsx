'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CircleCheck,
  TrendingUp,
  TrendingDown,
  Check,
  Move,
  CircleX,
  Plus,
  Image as ImageIcon,
  Video,
  Mic,
  Send,
  MapPin,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import {
  Alert,
  AlertDisplay,
  ConfirmationActionType,
  RECONFIRMATION_ACTIONS,
  AlertEvidence,
  EvidenceType,
} from '@/types/alerts';

// ============================================================================
// Types
// ============================================================================

export interface AlertReconfirmationSheetProps {
  alert: AlertDisplay;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    alertId: string,
    action: ConfirmationActionType,
    note?: string,
    evidence?: { type: EvidenceType; file?: File }
  ) => void;
  isSubmitting?: boolean;
}

// ============================================================================
// Action Button Component
// ============================================================================

interface ActionButtonProps {
  action: ConfirmationActionType;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

function ActionButton({ action, isSelected, onClick, disabled }: ActionButtonProps) {
  const config = RECONFIRMATION_ACTIONS[action];
  
  const IconComponent = config.icon === 'TrendingUp' ? TrendingUp :
                        config.icon === 'TrendingDown' ? TrendingDown :
                        config.icon === 'CircleCheck' ? CircleCheck :
                        config.icon === 'Check' ? Check :
                        config.icon === 'Move' ? Move :
                        config.icon === 'CircleX' ? CircleX :
                        config.icon === 'Plus' ? Plus : CircleCheck;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        isSelected
          ? cn(config.bgColor, config.borderColor, 'border-2')
          : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
      )}
    >
      <IconComponent className={cn('w-6 h-6', config.color)} />
      <span className={cn('text-sm font-medium', config.color)}>
        {config.label}
      </span>
      <span className="text-xs text-slate-500 dark:text-slate-400 text-center">
        {config.description}
      </span>
    </button>
  );
}

// ============================================================================
// Note Input Component
// ============================================================================

interface NoteInputProps {
  value: string;
  onChange: (value: string) => void;
  isRequired: boolean;
  placeholder?: string;
}

function NoteInput({ value, onChange, isRequired, placeholder }: NoteInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Add a note {isRequired && <span className="text-red-500">*</span>}
        </label>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {value.length}/500
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, 500))}
        placeholder={placeholder || 'Describe what you observed...'}
        rows={4}
        className={cn(
          'w-full px-3 py-2 rounded-lg border',
          'bg-white dark:bg-slate-800',
          'border-slate-300 dark:border-slate-600',
          'focus:outline-none focus:ring-2 focus:ring-forest-500',
          'text-slate-900 dark:text-white',
          'text-sm',
          'resize-none'
        )}
      />
    </div>
  );
}

// ============================================================================
// Evidence Upload Component
// ============================================================================

interface EvidenceUploadProps {
  onFileSelect: (file: File, type: EvidenceType) => void;
  existingEvidence?: AlertEvidence[];
}

function EvidenceUpload({ onFileSelect, existingEvidence }: EvidenceUploadProps) {
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file: File) => {
    const type = file.type.startsWith('image/') ? EvidenceType.PHOTO :
                 file.type.startsWith('video/') ? EvidenceType.VIDEO :
                 file.type.startsWith('audio/') ? EvidenceType.AUDIO :
                 EvidenceType.NOTE;
    
    if (type !== EvidenceType.NOTE) {
      onFileSelect(file, type);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
        Add Evidence (Optional)
      </label>
      
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          'border-2 border-dashed rounded-xl p-6 text-center transition-colors',
          dragOver
            ? 'border-forest-500 bg-forest-50 dark:bg-forest-900/20'
            : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
        )}
      >
        <ImageIcon className="w-8 h-8 mx-auto text-slate-400 mb-2" />
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Drop a photo, video, or audio file here
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
          or click to browse
        </p>
        <input
          type="file"
          accept="image/*,video/*,audio/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
          className="hidden"
          id="evidence-upload"
        />
        <label
          htmlFor="evidence-upload"
          className="inline-block mt-3"
        >
          <Button variant="outline" size="sm" asChild>
            <span>Browse Files</span>
          </Button>
        </label>
      </div>

      {existingEvidence && existingEvidence.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Existing evidence ({existingEvidence.length})
          </p>
          <div className="flex gap-2 overflow-x-auto">
            {existingEvidence.slice(0, 5).map((evidence) => {
              const Icon = evidence.mediaType === EvidenceType.PHOTO ? ImageIcon :
                           evidence.mediaType === EvidenceType.VIDEO ? Video :
                           evidence.mediaType === EvidenceType.AUDIO ? Mic :
                           Info;
              
              return (
                <div
                  key={evidence.id}
                  className="flex-shrink-0 w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
                >
                  <Icon className="w-6 h-6 text-slate-400" />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Safety Notice Component
// ============================================================================

function SafetyNotice() {
  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
      <div className="flex items-start gap-2">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
            Safety First
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
            Only report when it's safe to do so. Do not approach hazards, wildlife, or dangerous situations to verify.
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main Reconfirmation Sheet Component
// ============================================================================

export function AlertReconfirmationSheet({
  alert,
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
}: AlertReconfirmationSheetProps) {
  const [selectedAction, setSelectedAction] = useState<ConfirmationActionType | null>(null);
  const [note, setNote] = useState('');
  const [selectedEvidence, setSelectedEvidence] = useState<{ file: File; type: EvidenceType } | null>(null);
  const [showEvidenceUpload, setShowEvidenceUpload] = useState(false);

  // Reset state when alert changes or sheet opens
  React.useEffect(() => {
    if (isOpen) {
      setSelectedAction(null);
      setNote('');
      setSelectedEvidence(null);
      setShowEvidenceUpload(false);
    }
  }, [isOpen, alert.id]);

  const handleSubmit = () => {
    if (!selectedAction) return;
    
    const config = RECONFIRMATION_ACTIONS[selectedAction];
    if (config.requiresNote && !note.trim()) return;

    onSubmit(
      alert.id,
      selectedAction,
      note.trim() || undefined,
      selectedEvidence || undefined
    );
  };

  const handleFileSelect = (file: File, type: EvidenceType) => {
    setSelectedEvidence({ file, type });
    setShowEvidenceUpload(false);
  };

  const selectedActionConfig = selectedAction ? RECONFIRMATION_ACTIONS[selectedAction] : null;
  const requiresNote = selectedActionConfig?.requiresNote ?? false;
  const canSubmit = selectedAction && (!requiresNote || note.trim());

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
      />

      {/* Sheet */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 max-h-[90vh] bg-white dark:bg-slate-900 rounded-t-2xl shadow-2xl z-50 overflow-hidden"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-5 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Update Alert
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {alert.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-5 space-y-5">
          {/* Alert Summary */}
          <Card padding="sm">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={alert.severity === AlertSeverity.CRITICAL ? 'danger' : 'warning'} size="sm">
                    {alert.severityLabel}
                  </Badge>
                  <Badge variant="info" size="sm">
                    {alert.confidenceLabel}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <MapPin className="w-3 h-3" />
                  <span>{alert.district}</span>
                  <span>•</span>
                  <span>Reported {alert.timeAgo}</span>
                </div>
              </div>
              {alert.evidenceCount > 0 && (
                <Badge variant="info" size="sm">
                  <ImageIcon className="w-3 h-3 mr-1" />
                  {alert.evidenceCount}
                </Badge>
              )}
            </div>
          </Card>

          {/* Safety Notice */}
          <SafetyNotice />

          {/* Action Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              What's the current status? {requiresNote && <span className="text-red-500">*</span>}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(Object.keys(RECONFIRMATION_ACTIONS) as ConfirmationActionType[]).map((action) => (
                <ActionButton
                  key={action}
                  action={action}
                  isSelected={selectedAction === action}
                  onClick={() => setSelectedAction(action)}
                />
              ))}
            </div>
          </div>

          {/* Note Input (conditionally shown) */}
          {selectedAction && requiresNote && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-3"
            >
              <NoteInput
                value={note}
                onChange={setNote}
                isRequired={requiresNote}
                placeholder={
                  selectedAction === ConfirmationActionType.MOVED_SLIGHTLY
                    ? 'Describe the new location...'
                    : selectedAction === ConfirmationActionType.INCORRECT_REPORT
                    ? 'Explain why this report is incorrect...'
                    : 'Add details about your observation...'
                }
              />
            </motion.div>
          )}

          {/* Evidence Upload */}
          {selectedAction && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              {!showEvidenceUpload && !selectedEvidence ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowEvidenceUpload(true)}
                  className="w-full"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Add Photo/Video/Audio (Optional)
                </Button>
              ) : (
                <EvidenceUpload
                  onFileSelect={handleFileSelect}
                  existingEvidence={[]}
                />
              )}

              {selectedEvidence && (
                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-forest-500" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                      {selectedEvidence.file.name}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedEvidence(null)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-5 py-4 flex items-center justify-between gap-3">
          <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
            icon={isSubmitting ? undefined : <Send className="w-4 h-4" />}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Update'}
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AlertReconfirmationSheet;
