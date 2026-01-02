'use client'

import VendingMachine from '@/components/VendingMachine'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="w-full max-w-2xl relative">

        {/* Main Vending Machine - Centered */}
        <VendingMachine />

<footer className="mt-6 text-center text-xs opacity-70 text-white">
  © 2026 Greetings Machine™ · Got bug or feedback?{" "}
  <a
    href="https://instagram.com/hichiew"
    target="_blank"
    rel="noopener noreferrer"
    className="underline hover:opacity-100"
  >
    DM me on IG @hichiew
  </a>
</footer>


      </div>
    </main>
  )
}
