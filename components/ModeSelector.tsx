'use client'

import { Mode, modeThemes, modeLabels } from '@/lib/theme'

interface ModeSelectorProps {
  mode: Mode
  onSelect: (mode: Mode) => void
  disabled: boolean
}

export default function ModeSelector({ mode, onSelect, disabled }: ModeSelectorProps) {
  const theme = modeThemes[mode]

  return (
    <div className="mb-6">
      <div className="section-header">SELECT MODE</div>
      <div className="grid grid-cols-3 gap-3">
        {(Object.keys(modeLabels) as Mode[]).map((modeId) => {
          const isSelected = mode === modeId
          const label = modeLabels[modeId]
          const modeTheme = modeThemes[modeId]
          
          return (
            <button
            key={modeId}
            onClick={() => !disabled && onSelect(modeId as Mode)}
            disabled={disabled}
            className="border-[3px] border-[var(--ink)] rounded-[var(--radius-panel)] p-4 flex flex-col items-center gap-3 transition-all select-none"
            style={{
              backgroundColor: isSelected ? theme.accent : 'var(--panel)',
              boxShadow: isSelected ? 'var(--shadow)' : 'none',
              transform: isSelected ? 'translateY(-1px)' : 'translateY(0)',
              opacity: disabled && !isSelected ? 0.5 : 1,
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
          >
            {/* Emoji tile */}
            <div
              className="border-[3px] border-[var(--ink)] rounded-2xl w-16 h-16 flex items-center justify-center text-3xl"
              style={{
                backgroundColor: isSelected ? 'var(--panel)' : '#FFFFFF',
              }}
            >
              {label.emoji}
            </div>
          
            {/* Oval label pill */}
            <div
              className="border-[3px] border-[var(--ink)] rounded-full px-6 py-2 font-black uppercase tracking-wide"
              style={{
                backgroundColor: isSelected ? '#FFFFFF' : 'var(--accent-yellow)',
                color: 'var(--ink)',
                fontSize: 'var(--font-button)',
                lineHeight: 1,
              }}
            >
              {label.label}
            </div>
          </button>          
          )
        })}
      </div>
    </div>
  )
}
