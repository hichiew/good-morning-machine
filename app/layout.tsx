import Script from "next/script"
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
       <head>
  <Script
    src="https://plausible.io/js/pa-24r8d4MWICvJZtsWM9BZW.js"
    strategy="afterInteractive"
  />
      </head>
      <body>{children}</body>
    </html>
  )
}




