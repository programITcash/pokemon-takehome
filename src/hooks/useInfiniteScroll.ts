// useInfiniteScroll hook for pagination

import { useCallback, useEffect, useRef } from 'react'

interface UseInfiniteScrollOptions {
  onLoadMore: () => void
  hasMore: boolean
  loading: boolean
  threshold?: number
  rootMargin?: string
}

/**
 * Hook for implementing infinite scroll functionality
 * @param options - Configuration options for infinite scroll
 * @returns Ref to attach to the sentinel element
 */
export function useInfiniteScroll({
  onLoadMore,
  hasMore,
  loading,
  threshold = 0.1,
  rootMargin = '100px'
}: UseInfiniteScrollOptions) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && hasMore && !loading) {
        onLoadMore()
      }
    },
    [hasMore, loading, onLoadMore]
  )

  useEffect(() => {
    const element = sentinelRef.current
    if (!element) return

    // Create observer
    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold,
      rootMargin
    })

    // Start observing
    observerRef.current.observe(element)

    // Cleanup
    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element)
      }
    }
  }, [handleObserver, threshold, rootMargin])

  return sentinelRef
}
