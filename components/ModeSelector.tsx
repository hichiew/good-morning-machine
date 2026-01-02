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

      {/* ALWAYS 3 columns */}
      <div className="grid grid-cols-2 gap-3">      {(Object.keys(modeLabels) as Mode[]).map((modeId) => {
          const isSelected = mode === modeId
          const label = modeLabels[modeId]

          return (
            <button
              key={modeId}
              type="button"
              onClick={() => !disabled && onSelect(modeId as Mode)}
              disabled={disabled}
              className="min-w-0 border-[3px] border-[var(--ink)] rounded-[var(--radius-panel)] p-3 sm:p-4 flex flex-col items-center gap-2 sm:gap-3 transition-all select-none touch-manipulation"
              style={{
                backgroundColor: isSelected ? theme.accent : 'var(--panel)',
                boxShadow: isSelected ? 'var(--shadow)' : 'none',
                transform: isSelected ? 'translateY(-1px)' : 'translateY(0)',
                opacity: disabled && !isSelected ? 0.5 : 1,
                cursor: disabled ? 'not-allowed' : 'pointer',
              }}
            >
              <div className="min-w-0 w-full flex flex-col items-center gap-2 sm:gap-3">
                {/* Emoji tile */}
                <div
                  className="border-[3px] border-[var(--ink)] rounded-2xl flex items-center justify-center mx-auto"
                  style={{
                    width: 'clamp(44px, 12vw, 64px)',
                    height: 'clamp(44px, 12vw, 64px)',
                    fontSize: 'clamp(20px, 6vw, 32px)',
                    backgroundColor: isSelected ? 'var(--panel)' : '#FFFFFF',
                  }}
                >
                  {label.emoji}
                </div>

                {/* Oval label pill */}
                <div
                  className="border-[3px] border-[var(--ink)] rounded-full w-full px-1.5 py-1.5 sm:px-2 sm:py-2 font-black uppercase text-center mx-auto"
                  style={{
                    backgroundColor: isSelected ? '#FFFFFF' : 'var(--accent-yellow)',
                    color: 'var(--ink)',
                    fontSize: 'clamp(9px, 2.6vw, 15px)',
                    letterSpacing: 'clamp(0.02em, 0.4vw, 0.08em)',
                    lineHeight: 1.1,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {label.label}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
