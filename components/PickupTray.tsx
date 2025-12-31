'use client'

import React from 'react'
import { MachineState, Mode } from '@/lib/theme'

interface PickupTrayProps {
  mode: Mode
  state: MachineState
  onOpen: () => void
}

export default function PickupTray({ state, onOpen }: PickupTrayProps) {
  const isReady = state === 'readyToOpen'
  const isGenerating = state === 'generating'
  const isEmpty = state === 'idle' || state === 'pulling'

  // Tray colors based on state
  const trayColor = isEmpty
    ? '#B0B0B0' // empty
    : isGenerating
    ? '#B0B0B0' // generating
    : '#F9C80E' // ready

  const clickable = isReady // only clickable when ready

  const handleTrayClick = () => {
    if (clickable) onOpen()
  }

  return (
    <button
      type="button"
      onClick={handleTrayClick}
      disabled={!clickable}
      className="w-full min-h-[160px] border-[3px] border-[var(--ink)] rounded-[var(--radius-panel)] transition-all relative select-none"
      style={{
        backgroundColor: trayColor,
        cursor: clickable ? 'pointer' : 'not-allowed',
        boxShadow: clickable ? 'var(--shadow)' : 'none',
        opacity: clickable ? 1 : 0.95,
      }}
      aria-label={isReady ? 'Open item' : isGenerating ? 'Generating' : 'Tray empty'}
    >
      <div className="h-full flex flex-col items-center justify-center gap-3 text-center px-4">
        {isEmpty && (
          <div style={{ fontSize: 'var(--font-button)', fontWeight: 800, color: '#666' }}>
            Tray is empty. Slide lever to start.
          </div>
        )}

        {isGenerating && (
          <>
            <div style={{ fontSize: 'var(--font-button)', fontWeight: 800, color: '#666' }}>
              Dispensing greetings image…
            </div>
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: '#666',
                    animation: `pulse 1s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </>
        )}

        {isReady && (
          <>
            <div style={{ fontSize: '4rem', lineHeight: 1 }}>📦</div>
            <div style={{ fontSize: 'var(--font-button)', fontWeight: 900, color: 'var(--ink)' }}>
              Click Here to Open
            </div>
          </>
        )}
      </div>
    </button>
  )
}
