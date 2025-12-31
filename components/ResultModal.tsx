'use client'

import { Mode, modeThemes } from '@/lib/theme'

interface ResultModalProps {
  mode: Mode
  imageUrl: string | null
  isOpen: boolean
  onClose: () => void
  onAnother: () => void
  onDownload: () => void
}

export default function ResultModal({
  mode,
  imageUrl,
  isOpen,
  onClose,
  onAnother,
  onDownload,
}: ResultModalProps) {
  if (!isOpen) return null

  const theme = modeThemes[mode]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60">
      <div
        className="panel p-6 max-w-lg w-full relative animate-[slideUp_0.3s_ease-out]"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 border-[3px] border-[var(--ink)] rounded-lg font-bold text-lg flex items-center justify-center transition-colors hover:bg-red-500 hover:text-white"
          style={{ backgroundColor: 'var(--panel)' }}
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div 
            className="font-black uppercase mb-2"
            style={{ 
              fontSize: 'var(--font-title)',
              color: 'var(--ink)'
            }}
          >
            IMAGE CREATED
          </div>
        </div>

        {/* Image preview */}
        {imageUrl && (
          <div className="mb-6 border-[3px] border-[var(--ink)] rounded-[var(--radius-panel)] overflow-hidden">
            <img
              src={imageUrl}
              alt="Generated greeting"
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Action buttons */}
        <div className="space-y-3">
          <button
            onClick={onDownload}
            className="w-full border-[3px] border-[var(--ink)] rounded-[var(--radius-button)] py-4 font-bold uppercase transition-all transform"
            style={{
              backgroundColor: theme.accent,
              color: 'var(--ink)',
              fontSize: 'var(--font-button)',
              boxShadow: '4px 4px 0 0 var(--ink)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(2px, 2px)'
              e.currentTarget.style.boxShadow = '2px 2px 0 0 var(--ink)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate(0, 0)'
              e.currentTarget.style.boxShadow = '4px 4px 0 0 var(--ink)'
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translate(3px, 3px)'
              e.currentTarget.style.boxShadow = '1px 1px 0 0 var(--ink)'
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'translate(2px, 2px)'
              e.currentTarget.style.boxShadow = '2px 2px 0 0 var(--ink)'
            }}
          >
            📥 DOWNLOAD IMAGE
          </button>

          <button
            onClick={onAnother}
            className="w-full border-[3px] border-[var(--ink)] rounded-[var(--radius-button)] py-4 font-bold uppercase transition-all transform"
            style={{
              backgroundColor: theme.machineBg,
              color: mode === 'memes' ? '#1A1A1A' : '#FFFFFF',
              fontSize: 'var(--font-button)',
              boxShadow: '4px 4px 0 0 var(--ink)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(2px, 2px)'
              e.currentTarget.style.boxShadow = '2px 2px 0 0 var(--ink)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate(0, 0)'
              e.currentTarget.style.boxShadow = '4px 4px 0 0 var(--ink)'
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translate(3px, 3px)'
              e.currentTarget.style.boxShadow = '1px 1px 0 0 var(--ink)'
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'translate(2px, 2px)'
              e.currentTarget.style.boxShadow = '2px 2px 0 0 var(--ink)'
            }}
          >
            🎰 BACK TO MACHINE
          </button>
        </div>
      </div>
    </div>
  )
}
