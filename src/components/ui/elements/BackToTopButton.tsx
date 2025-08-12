'use client'

import React from 'react'
import { useScrollToTop } from '@/hooks/useScrollToTop'

interface BackToTopButtonProps {
  className?: string
  threshold?: number
}

const BackToTopButton: React.FC<BackToTopButtonProps> = ({
  className = '',
  threshold = 300
}) => {
  const { showScrollTop, scrollToTop } = useScrollToTop({ threshold })

  if (!showScrollTop) return null

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus-visible-ring ${className}`}
      title="Back to Top"
      aria-label="Scroll back to top"
    >
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  )
}

export default BackToTopButton
