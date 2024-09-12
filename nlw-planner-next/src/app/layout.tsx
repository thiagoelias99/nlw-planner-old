import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import LoginHeader from '@/components/login-header'
import { auth } from '@/auth'
import { getMailClient } from '@/infra/mailer'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()

  return (
    <html lang="pt-BR" className='dark'>
      <Providers>
        <body className={cn('min-h-screen bg-background font-sans antialiased', inter.className)}
        >
          <div>
            <LoginHeader session={session} />
            {children}
            <Toaster />
          </div>
        </body>
      </Providers>
    </html>
  )
}