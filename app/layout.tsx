import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Good Morning Machine',
  description: 'Generate fun greeting images for any occasion',
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




