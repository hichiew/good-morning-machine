'use client'

import VendingMachine from '@/components/VendingMachine'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="w-full max-w-2xl relative">
        {/* Decorative stickers/posters - anchored to viewport corners */}
        <div className="fixed top-4 left-4 hidden md:block z-10">
          <div
            className="border-[3px] border-[var(--ink)] rounded-lg p-3 rotate-[-5deg]"
            style={{ backgroundColor: 'var(--accent-yellow)' }}
          >
            <div className="text-2xl">⭐</div>
            <div className="text-xs font-bold" style={{ color: 'var(--ink)' }}>NEW!</div>
          </div>
        </div>
        
        <div className="fixed top-4 right-4 hidden md:block z-10">
          <div
            className="border-[3px] border-[var(--ink)] rounded-lg p-3 rotate-[5deg]"
            style={{ backgroundColor: 'var(--accent-yellow)' }}
          >
            <div className="text-2xl">🎰</div>
            <div className="text-xs font-bold" style={{ color: 'var(--ink)' }}>FUN!</div>
          </div>
        </div>

        {/* Main Vending Machine - Centered */}
        <VendingMachine />
      </div>
    </main>
  )
}
