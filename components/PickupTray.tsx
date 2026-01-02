'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { MachineState, Mode } from '@/lib/theme'
import { track } from "@/app/lib/analytics"

interface PickupTrayProps {
  mode: Mode
  state: MachineState
  onOpen: () => void
}

export default function PickupTray({ mode, state, onOpen }: PickupTrayProps) {
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
    track("tray_click", { state })
    if (clickable) onOpen()
  }
  

  // Witty loading lines (rotates while generating)
  const loadingLines = useMemo(() => {
    const base = [
      'Printing in 144p…',
      'Adding more glow effect to image…',
      'Downloading vibes from 2004…',
      'Finding the most motivational flower…',
    ]

    const byMode: Record<Mode, string[]> = {
      default: [
        'Picking the nicest sunrise… 🌅',
        'Selecting premium garden energy… 🌸',
        'Adding blessings and good fortune…',
      ],
      memes: [
        'Getting inspired by memes from the web…',
        'This will take a moment...',
      ],
      blindbox: [
        'Spinning the surprise wheel…',
        'Consulting the loot table…',
        'Outcome may be emotionally confusing…',
      ],
    }

    // Keep it deterministic-ish per mode, but still fun
    return [...base, ...(byMode[mode] ?? [])]
  }, [mode])

  const [loadingText, setLoadingText] = useState(loadingLines[0])

  useEffect(() => {
    if (!isGenerating) return

    // Start with a fresh random line each time we enter generating
    let i = Math.floor(Math.random() * loadingLines.length)
    setLoadingText(loadingLines[i])

    const id = window.setInterval(() => {
      i = (i + 1) % loadingLines.length
      setLoadingText(loadingLines[i])
    }, 3000)

    return () => window.clearInterval(id)
  }, [isGenerating, loadingLines])

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
              {loadingText}
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
