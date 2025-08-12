'use client'

import React, { useMemo, useEffect, useState } from 'react'

interface SparkleBackgroundProps {
  className?: string
  sparkleCount?: number
}

interface Sparkle {
  id: number
  size: string
  top: string
  left: string
  delay: string
  duration: string
  opacity: number
}

// Deterministic random number generator using seed
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

const SparkleBackground: React.FC<SparkleBackgroundProps> = ({
  className = '',
  sparkleCount = 50
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const sparkles = useMemo<Sparkle[]>(
    () =>
      Array.from({ length: sparkleCount }).map((_, index) => {
        // Use deterministic values based on index to avoid hydration mismatch
        const seed1 = index * 12345 + 67890
        const seed2 = index * 54321 + 98765
        const seed3 = index * 11111 + 22222
        const seed4 = index * 33333 + 44444
        const seed5 = index * 55555 + 66666
        const seed6 = index * 77777 + 88888

        return {
          id: index,
          size: `${seededRandom(seed1) * 4 + 1}px`,
          top: `${seededRandom(seed2) * 100}%`,
          left: `${seededRandom(seed3) * 100}%`,
          delay: `${seededRandom(seed4) * 6}s`,
          duration: `${3 + seededRandom(seed5) * 5}s`,
          opacity: seededRandom(seed6) * 0.6 + 0.1
        }
      }),
    [sparkleCount]
  )

  // Don't render on server to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute rounded-full bg-white dark:bg-gray-300 animate-pulse"
          style={{
            width: sparkle.size,
            height: sparkle.size,
            top: sparkle.top,
            left: sparkle.left,
            opacity: sparkle.opacity,
            animationDelay: sparkle.delay,
            animationDuration: sparkle.duration,
            filter: 'blur(1px)'
          }}
        />
      ))}
    </div>
  )
}

export default SparkleBackground
