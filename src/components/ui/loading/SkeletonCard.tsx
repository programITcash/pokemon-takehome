// Skeleton loading card for better UX

import React from 'react'
import { LoadingSpinner } from './LoadingSpinner'

interface SkeletonCardProps {
  className?: string
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  className = ''
}) => {
  return (
    <div
      className={`animate-pulse rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 ${className}`}
    >
      <div className="mb-4 h-48 rounded bg-gray-200 dark:bg-gray-600" />
      <div className="space-y-3">
        <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-600" />
        <div className="flex gap-2">
          <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-600" />
          <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-600" />
        </div>
      </div>
    </div>
  )
}

interface SkeletonGridProps {
  count?: number
  className?: string
  showSpinner?: boolean
}

export const SkeletonGrid: React.FC<SkeletonGridProps> = ({
  count = 8,
  className = '',
  showSpinner = false
}) => {
  if (showSpinner) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner size="lg" text="Loading Pokemon..." />
      </div>
    )
  }

  return (
    <div className={`pokemon-grid ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  )
}
