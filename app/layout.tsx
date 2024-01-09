import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react';
import Menu from './menu'

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
        )}>
          <div className='flex  min-h-screen'>
            <Menu></Menu>
            {children}
          </div>
          <Analytics />
        
        </body>
    </html>
  )
}
