import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/components/modal-provider'
import { ToasterProvider } from '@/components/oaster-provider'
import { CrispChat } from '@/components/crisp-chat'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OpenAI',
  description: 'AI Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
    <ToasterProvider/>
      <body className={inter.className}>
        
        <CrispChat/>
        <ModalProvider/>
        {children}
        </body>
    </html>
    </ClerkProvider>
  )
}
