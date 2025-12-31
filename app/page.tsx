'use client'

import { useState } from 'react'
import GreetingGenerator from '@/components/GreetingGenerator'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">
          🌅 Greetings Vending Machine
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Create beautiful greeting images for any occasion
        </p>
        <GreetingGenerator />
      </div>
    </main>
  )
}



