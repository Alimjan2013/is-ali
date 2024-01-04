import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react';

import { cn } from "@/lib/utils"
 
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Is - Ali',
  description: 'This is blog for Alimjan Ablimit',
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
          inter.className
        )}>{children}
          <Analytics />
        
        </body>
    </html>
  )
}
