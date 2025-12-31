'use client'

import { useState, useRef } from 'react'
import { Mode, MachineState, modeThemes } from '@/lib/theme'
import ModeSelector from './ModeSelector'
import OccasionSelector from './OccasionSelector'
import LeverControl from './LeverControl'
import PickupTray from './PickupTray'
import ResultModal from './ResultModal'

type Occasion = 'good-morning' | 'new-year' | 'happy-birthday' | 'have-a-great-day'

interface GreetingTemplate {
  mainText: string
  subText?: string
  emoji: string
  bgColor: string
  textColor: string
  decorations?: string[]
}

const defaultTemplates: Record<Occasion, GreetingTemplate> = {
  'good-morning': {
    mainText: 'Good Morning',
    subText: 'May today be filled with peace and kindness',
    emoji: '🌸',
    bgColor: '#FFE5B4',
    textColor: '#8B4513',
    decorations: ['🌻', '🌺', '🌷', '🌹', '🌼'],
  },
  'new-year': {
    mainText: 'Happy New Year',
    subText: 'Wishing you joy and prosperity',
    emoji: '🎉',
    bgColor: '#FFD700',
    textColor: '#8B0000',
    decorations: ['🎊', '🎈', '✨', '🌟', '💫'],
  },
  'happy-birthday': {
    mainText: 'Happy Birthday',
    subText: 'May your wishes come true',
    emoji: '🐉',
    bgColor: '#FF6B6B',
    textColor: '#8B0000',
    decorations: ['🧧', '🏮', '🎋', '💰', '🍊'],
  },
  'have-a-great-day': {
    mainText: 'Have a Great Day',
    subText: 'You are loved and appreciated',
    emoji: '☀️',
    bgColor: '#87CEEB',
    textColor: '#2C3E50',
    decorations: ['🌞', '🦋', '🌿', '🌺', '💐'],
  },
}

const memesTemplates: Record<Occasion, GreetingTemplate> = {
  'good-morning': {
    mainText: 'Good morning.',
    subText: 'You are awake. That is all.',
    emoji: '☕',
    bgColor: '#E8E8E8',
    textColor: '#2C2C2C',
    decorations: ['📊', '📈', '📉'],
  },
  'new-year': {
    mainText: 'New Year',
    subText: 'Time is a construct. Continue.',
    emoji: '📅',
    bgColor: '#2C2C2C',
    textColor: '#FFFFFF',
    decorations: ['📋', '📝', '🗓️'],
  },
  'happy-birthday': {
    mainText: 'Happy Birthday',
    subText: 'May your wishes come true',
    emoji: '🗓️',
    bgColor: '#1A1A1A',
    textColor: '#E0E0E0',
    decorations: ['📊', '📈', '📉'],
  },
  'have-a-great-day': {
    mainText: 'Have a Great Day',
    subText: 'Let\'s circle back to having a good day.',
    emoji: '📧',
    bgColor: '#4A4A4A',
    textColor: '#FFFFFF',
    decorations: ['📄', '📎', '📌'],
  },
}

export default function VendingMachine() {
  const [mode, setMode] = useState<Mode>('default')
  const [occasion, setOccasion] = useState<Occasion>('good-morning')
  const [state, setState] = useState<MachineState>('idle')
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const theme = modeThemes[mode]
  const isLocked = state === 'pulling' || state === 'generating' || state === 'readyToOpen' || state === 'opened'
  const canPullLever = !isLocked && mode && (mode === 'blindbox' || occasion)

  const generateImage = (selectedMode: Mode, selectedOccasion: Occasion) => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    canvas.width = 1080
    canvas.height = 1080

    let template: GreetingTemplate
    if (selectedMode === 'blindbox') {
      const randomMode = Math.random() > 0.5 ? 'default' : 'memes'
      template = randomMode === 'default' 
        ? defaultTemplates[selectedOccasion]
        : memesTemplates[selectedOccasion]
    } else {
      template = selectedMode === 'default'
        ? defaultTemplates[selectedOccasion]
        : memesTemplates[selectedOccasion]
    }

    ctx.fillStyle = template.bgColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    if (template.decorations && (selectedMode === 'default' || (selectedMode === 'blindbox' && Math.random() > 0.5))) {
      template.decorations.forEach((decoration, index) => {
        const x = (canvas.width / (template.decorations!.length + 1)) * (index + 1)
        const y = canvas.height * 0.2 + Math.sin(index) * 30
        ctx.font = '48px Arial'
        ctx.fillText(decoration, x, y)
      })
    }

    ctx.fillStyle = template.textColor
    ctx.font = selectedMode === 'memes' ? 'bold 72px Arial' : 'bold 80px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
    ctx.shadowBlur = 8
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2

    const mainTextY = canvas.height * 0.4
    ctx.fillText(`${template.emoji} ${template.mainText} ${template.emoji}`, canvas.width / 2, mainTextY)

    if (template.subText) {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
      ctx.shadowBlur = 6
      ctx.font = selectedMode === 'memes' ? '36px Arial' : '42px Arial'
      ctx.fillText(template.subText, canvas.width / 2, mainTextY + 120)
    }

    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0

    return canvas.toDataURL('image/png')
  }

  const handlePullLever = () => {
    if (!canPullLever) return

    setState('pulling')
    
    // For blindbox, randomly select occasion too
    const selectedOccasion = mode === 'blindbox' && Math.random() > 0.7
      ? (['good-morning', 'new-year', 'happy-birthday', 'have-a-great-day'] as Occasion[])[
          Math.floor(Math.random() * 4)
        ]
      : occasion

    // Move to generating state
    setTimeout(() => {
      setState('generating')
      
      // Generate image after a brief delay
      setTimeout(() => {
        const imageUrl = generateImage(mode, selectedOccasion)
        setGeneratedImageUrl(imageUrl)
        setState('readyToOpen')
      }, 1500)
    }, 300)
  }

  const handleOpenItem = () => {
    if (state !== 'readyToOpen') return
    setState('opened')
  }

  const handleCloseModal = () => {
    setState('idle')
    setGeneratedImageUrl(null)
  }

  const handleAnother = () => {
    setState('idle')
    setGeneratedImageUrl(null)
  }

  const handleDownload = () => {
    if (!generatedImageUrl) return
    
    const link = document.createElement('a')
    link.download = `greeting-${mode}-${Date.now()}.png`
    link.href = generatedImageUrl
    link.click()
  }

  return (
    <div>
      {/* Hidden canvas for image generation */}
      <canvas ref={canvasRef} className="hidden" /> 
      {/* Vending Machine Container */}
      <div
        className="machine-container p-6"
        style={{ backgroundColor: theme.machineBg }}
      >
        {/* Title Banner - Standalone, boldest color */}
      <div
        className="border-[3px] border-[var(--ink)] rounded-[var(--radius-outer)] p-5 mb-4"
        style={{
          backgroundColor: '#D63AF9', // Deep cobalt blue - unique, bold, poppy
          boxShadow: '0',
        }}
      >
        <div
          className="font-black uppercase tracking-wider text-center"
          style={{ 
            fontSize: '48px',
            color: '#FFFFFF',
            lineHeight: '1.1'
          }}
        >
          GREETINGS MACHINE
        </div>
      </div>

      {/* Instruction Panel (light blue, bigger, same font) */}
            <div
        className="border-[3px] border-[var(--ink)] rounded-[var(--radius-panel)] p-2 mt-4 mb-6 text-center font-bold"
        style={{
            backgroundColor: '#F9B3D1',
            boxShadow: '0',
            color: 'var(--ink)',
            fontSize: 'var(--font-button)', // bigger than helper text
            lineHeight: '1.4',
        }}
        >
        A VENDING MACHINE TO GET GREETING IMAGES
        </div>

        {/* Display Window */}
        <div className="panel p-6 mb-6">
          <ModeSelector
            mode={mode}
            onSelect={setMode}
            disabled={isLocked}
          />
          
          <OccasionSelector
            mode={mode}
            occasion={occasion}
            onSelect={setOccasion}
            disabled={isLocked}
            show={mode !== 'blindbox'}
          />
        </div>

        {/* Lever Control */}
        <div className="mb-6">
          <LeverControl
            mode={mode}
            onPull={handlePullLever}
            disabled={!canPullLever}
          />
        </div>

        {/* Pickup Tray */}
        <PickupTray
          mode={mode}
          state={state}
          onOpen={handleOpenItem}
        />
      </div>

      {/* Result Modal */}
      <ResultModal
        mode={mode}
        imageUrl={generatedImageUrl}
        isOpen={state === 'opened'}
        onClose={handleCloseModal}
        onAnother={handleAnother}
        onDownload={handleDownload}
      />
    </div>
  )
}
