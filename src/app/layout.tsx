import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import ClientErrorBoundary from '@/components/error/ClientErrorBoundary'
import SparkleBackground from '@/components/ui/backgrounds/SparkleBackground'
import BackToTopButton from '@/components/ui/elements/BackToTopButton'
import DarkModeToggle from '@/components/ui/elements/DarkModeToggle'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Pokemon Explorer',
  description: 'Explore and discover Pokemon with infinite scroll'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative min-h-screen bg-gray-50 font-sans antialiased transition-colors dark:bg-gray-900`}
      >
        <SparkleBackground />
        <ClientErrorBoundary>
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <header className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  Pokemon Explorer
                </h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                  Discover and explore Pokemon with our interactive grid
                </p>
              </div>
              <DarkModeToggle />
            </header>
            {children}
          </div>
          <BackToTopButton />
        </ClientErrorBoundary>
      </body>
    </html>
  )
}
