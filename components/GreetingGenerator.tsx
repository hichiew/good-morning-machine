'use client'

import { useState, useRef } from 'react'

type GreetingType = 'good-morning' | 'happy-new-year' | 'good-night' | 'happy-birthday' | 'custom'

const greetingTemplates: Record<GreetingType, { text: string; emoji: string }> = {
  'good-morning': { text: 'Good Morning!', emoji: '🌅' },
  'happy-new-year': { text: 'Happy New Year!', emoji: '🎉' },
  'good-night': { text: 'Good Night!', emoji: '🌙' },
  'happy-birthday': { text: 'Happy Birthday!', emoji: '🎂' },
  'custom': { text: '', emoji: '✨' },
}

export default function GreetingGenerator() {
  const [greetingType, setGreetingType] = useState<GreetingType>('good-morning')
  const [customText, setCustomText] = useState('')
  const [bgColor, setBgColor] = useState('#FF6B6B')
  const [textColor, setTextColor] = useState('#FFFFFF')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleGenerate = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 800
    canvas.height = 600

    // Fill background
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Get greeting text
    const template = greetingTemplates[greetingType]
    const displayText = greetingType === 'custom' ? customText : template.text
    const emoji = template.emoji

    // Draw text with emoji
    ctx.fillStyle = textColor
    ctx.font = 'bold 64px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    // Draw emoji and text
    const fullText = `${emoji} ${displayText} ${emoji}`
    ctx.fillText(fullText, canvas.width / 2, canvas.height / 2)

    // Add a subtle shadow for depth
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
    ctx.shadowBlur = 10
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2
  }

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.download = `greeting-${greetingType}-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="space-y-4">
          {/* Greeting Type Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Greeting Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {(Object.keys(greetingTemplates) as GreetingType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setGreetingType(type)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    greetingType === type
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {type.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Text Input */}
          {greetingType === 'custom' && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Custom Greeting Text
              </label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Enter your greeting..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              />
            </div>
          )}

          {/* Color Pickers */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Background Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-16 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Text Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-16 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleGenerate}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Generate Image
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Download Image
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Preview */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Preview</h2>
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            className="border-2 border-gray-300 dark:border-gray-600 rounded-lg max-w-full"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </div>
    </div>
  )
}




