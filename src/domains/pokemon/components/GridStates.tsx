'use client'

import React from 'react'
import { LoadingSpinner } from '@/components/ui/loading/LoadingSpinner'
import { SkeletonGrid } from '@/components/ui/loading/SkeletonCard'
import { ErrorMessage } from '@/components/ui/error/ErrorMessage'

interface SearchLoadingStateProps {
  search: string
}

export function SearchLoadingState({ search }: SearchLoadingStateProps) {
  return (
    <div className="py-12 text-center">
      <LoadingSpinner size="lg" text={`Searching for "${search}"...`} />
    </div>
  )
}

export function InitialLoadingState() {
  return <SkeletonGrid />
}

interface EmptyStateProps {
  search: string
}

export function EmptyState({ search }: EmptyStateProps) {
  return (
    <div className="py-12 text-center">
      <p className="text-lg text-gray-600 dark:text-gray-300">
        No Pokemon found matching &ldquo;{search}&rdquo;
      </p>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Try searching for a different name, type, or description
      </p>
    </div>
  )
}

interface ErrorStateProps {
  error: string
  onRetry: () => void
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <ErrorMessage
      title="Failed to load Pokemon"
      message={error}
      onRetry={onRetry}
    />
  )
}

interface LoadMoreStateProps {
  loading: boolean
}

export function LoadMoreState({ loading }: LoadMoreStateProps) {
  if (!loading) return null

  return (
    <div className="flex justify-center py-4">
      <LoadingSpinner size="md" />
    </div>
  )
}

interface EndOfResultsStateProps {
  pokemonCount: number
  totalCount: number
}

export function EndOfResultsState({
  pokemonCount,
  totalCount
}: EndOfResultsStateProps) {
  return (
    <div className="py-8 text-center">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        You&apos;ve reached the end! {pokemonCount} of {totalCount} Pokemon
        loaded.
      </p>
    </div>
  )
}
