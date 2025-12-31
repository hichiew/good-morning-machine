import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Greetings Machine',
  description: 'A wholesome image vending machine with a mischievous streak',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}




