import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RailTech – Railway Track Solutions',
  description:
    'Premium railway track sleeper products from steam-era timber to Shinkansen-grade precision slab track.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
