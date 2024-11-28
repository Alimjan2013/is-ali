import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import Menu from './menu'

import { cn } from "@/lib/utils"
 
const inter = Inter({ subsets: ['latin'] })

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";


export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Is - Ali',
  description: 'This is blog for Alimjan Ablimit',
  openGraph: {
    title: 'Is - Ali',
    description: 'This is blog for Alimjan Ablimit',
    url: 'https://www.is-ali.tech',
    siteName: 'Next.js',
    images: [
      {
        url: 'http://io.iooslo.tech/is_Ali/og.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'http://io.iooslo.tech/is_Ali/og-alt.png', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'This is blog for Alimjan Ablimit',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body  className={cn(
          "min-h-screen bg-background font-sans antialiased",
        )}>
          <div className='flex flex-col md:flex-row min-h-screen h-dvh'>
            <Menu></Menu>
            {children}
          </div>
          <Analytics />
          <SpeedInsights />
        </body>
    </html>
  )
}
