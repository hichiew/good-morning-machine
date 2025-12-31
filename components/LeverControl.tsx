'use client'

import { useState, useRef, useEffect } from 'react'
import { Mode, modeThemes } from '@/lib/theme'

interface LeverControlProps {
  mode: Mode
  onPull: () => void
  disabled: boolean
}

export default function LeverControl({ mode, onPull, disabled }: LeverControlProps) {
  const [leverValue, setLeverValue] = useState(0) // 0 to 1
  const [isDragging, setIsDragging] = useState(false)
  const [isLongPressing, setIsLongPressing] = useState(false)
  const leverRef = useRef<HTMLDivElement>(null)
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null)
  const theme = modeThemes[mode]

  const knobRef = useRef<HTMLDivElement>(null)
  const [hintOffset, setHintOffset] = useState(0)
  const [isHinting, setIsHinting] = useState(false)
  

  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled) return
    
    e.preventDefault()
    setIsDragging(true)
    leverRef.current?.setPointerCapture(e.pointerId)
    
    // Update position immediately
    if (leverRef.current) {
      const rect = leverRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const width = rect.width
      const newValue = Math.max(0, Math.min(1, x / width))
      setLeverValue(newValue)
    }
    
    // Start long-press timer
    longPressTimerRef.current = setTimeout(() => {
      setIsLongPressing(true)
      onPull()
      setLeverValue(0)
    }, 600)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || disabled || !leverRef.current) return
    
    const rect = leverRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const width = rect.width
    const newValue = Math.max(0, Math.min(1, x / width))
    
    setLeverValue(newValue)
    
    // If dragged past 90%, trigger pull
    if (newValue >= 0.9) {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
        longPressTimerRef.current = null
      }
      setIsDragging(false)
      setIsLongPressing(false)
      setLeverValue(0) // Reset
      leverRef.current?.releasePointerCapture(e.pointerId)
      onPull()
    }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = null
    }
    setIsDragging(false)
    setIsLongPressing(false)
    leverRef.current?.releasePointerCapture(e.pointerId)
    
    // Reset lever if not triggered
    if (leverValue < 0.9) {
      setLeverValue(0)
    }
  }

  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
      }
    }
  }, [])

  // percent of track that the knob center can travel (so it doesn't get clipped)
  const KNOB_SIZE = 56
  const EDGE_PADDING = 6

  const trackWidth = leverRef.current?.clientWidth ?? 0
  const usable = Math.max(1, trackWidth - KNOB_SIZE - EDGE_PADDING * 2)
  const leftPx = EDGE_PADDING + leverValue * usable


  useEffect(() => {
    if (disabled) return
    if (isDragging) return
    if (leverValue !== 0) return
  
    const trackEl = leverRef.current
    const knobEl = knobRef.current
    if (!trackEl || !knobEl) return
  
    const trackW = trackEl.clientWidth
    const knobW = knobEl.clientWidth
    const travel = Math.max(0, trackW - knobW - 12)
    const dist = Math.round(travel * 0.3)
    if (dist <= 0) return
  
    let cancelled = false
    setIsHinting(true)
  
    const timers: number[] = []
    timers.push(
      window.setTimeout(() => !cancelled && setHintOffset(dist), 450),
      window.setTimeout(() => !cancelled && setHintOffset(0), 850),
      window.setTimeout(() => !cancelled && setHintOffset(dist), 1250),
      window.setTimeout(() => !cancelled && setHintOffset(0), 1650),
      window.setTimeout(() => {
        if (!cancelled) {
          setHintOffset(0)
          setIsHinting(false)
        }
      }, 1850)
    )
  
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
      setHintOffset(0)
      setIsHinting(false)
    }
  }, [disabled, isDragging, leverValue])
  

  return (
    <div className="flex flex-col items-center">
      {/* Standalone lever track - no outer container, mechanical slider */}
      <div
        ref={leverRef}
        className="w-full h-16 border-[3px] border-[var(--ink)] rounded-full relative overflow-hidden mb-2"
        style={{ 
          backgroundColor: disabled ? '#D3D3D3' : '#E8E8E8', // Grey track
          cursor: disabled ? 'not-allowed' : 'default',
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Instruction text - always visible, small, italic, secondary */}
        <div
    className="absolute inset-0 flex items-center justify-center"
    style={{ pointerEvents: 'none' }}
  >
        Slide right to start</div>
        <div
  ref={knobRef}
  className="absolute top-1/2 border-[3px] border-[var(--ink)] rounded-full touch-none flex items-center justify-center"
  style={{
    width: '56px',
    height: '56px',

    // knob position (0%..100%) with correct centering
    left: `${leftPx}px`,

    // IMPORTANT: always translate(-50%, -50%) so left is knob center,
    // then add hintOffset in px for the wiggle
    transform: `translateY(-50%) translateX(${!isDragging && leverValue === 0 ? hintOffset : 0}px) ${isLongPressing ? 'scale(0.95)' : 'scale(1)'}`,
    backgroundColor: disabled ? '#A0A0A0' : theme.accent,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,

    // Smooth wiggle when not dragging; no smoothing during drag
    transition: isDragging ? 'none' : 'left 0.10s ease-out, transform 0.22s ease-in-out',
  }}
  onPointerDown={handlePointerDown}
>
  <div className="h-full flex items-center justify-center font-bold text-3xl select-none" />
</div>
      </div>
      
      
    </div>
  )
}
