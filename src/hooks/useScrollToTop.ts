'use client'

import { useState, useEffect } from 'react'

interface UseScrollToTopOptions {
  threshold?: number
  behavior?: ScrollBehavior
}

interface UseScrollToTopReturn {
  showScrollTop: boolean
  scrollToTop: () => void
}

/**
 * Custom hook to handle scroll-to-top functionality
 * Shows/hides a scroll button based on scroll position and provides scroll function
 *
 * @param options Configuration options
 * @returns Object with showScrollTop boolean and scrollToTop function
 */
export function useScrollToTop(
  options: UseScrollToTopOptions = {}
): UseScrollToTopReturn {
  const { threshold = 500, behavior = 'smooth' } = options
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > threshold)
    }

    // Check initial position
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior
    })
  }

  return {
    showScrollTop,
    scrollToTop
  }
}
