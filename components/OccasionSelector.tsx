'use client'

import { Mode, modeThemes } from '@/lib/theme'

type Occasion = 'good-morning' | 'new-year' | 'happy-birthday' | 'have-a-great-day'

interface OccasionSelectorProps {
  mode: Mode
  occasion: Occasion
  onSelect: (occasion: Occasion) => void
  disabled: boolean
  show: boolean
}

const occasions = [
  { id: 'good-morning' as Occasion, label: 'Good Morning', emoji: '🌅' },
  { id: 'new-year' as Occasion, label: 'Happy New Year', emoji: '🎉' },
  { id: 'happy-birthday' as Occasion, label: 'Happy Birthday', emoji: '🥳 ' },
  { id: 'have-a-great-day' as Occasion, label: 'Have a Great Day', emoji: '☀️' },
]

export default function OccasionSelector({
  mode,
  occasion,
  onSelect,
  disabled,
  show,
}: OccasionSelectorProps) {
  if (!show) return null

  const theme = modeThemes[mode]

  return (
    <div>
      <div className="section-header">SELECT OCCASION</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {occasions.map((occ) => {
          const isSelected = occasion === occ.id
          return (
            <button
              key={occ.id}
              onClick={() => !disabled && onSelect(occ.id)}
              disabled={disabled}
              className={`occasion-button ${isSelected ? 'selected' : ''}`}
              style={{
                backgroundColor: isSelected 
                  ? theme.occasionBtnSelectedBg 
                  : disabled 
                  ? '#E8E8E8' // Grey when disabled
                  : theme.occasionBtnBg, // Neutral cream base
                color: isSelected 
                  ? theme.occasionBtnSelectedText 
                  : disabled 
                  ? '#A0A0A0' // Desaturated when disabled
                  : theme.occasionBtnText,
                opacity: disabled && !isSelected ? 0.5 : 1,
                cursor: disabled ? 'not-allowed' : 'pointer',
                borderStyle: isSelected ? 'solid' : 'solid',
                borderWidth: isSelected ? '3px' : '2px', // Stronger border when selected
              }}
            >
              <span className="mr-2 text-xl">{occ.emoji}</span>
              <span style={{ fontSize: 'var(--font-button)' }}>{occ.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
