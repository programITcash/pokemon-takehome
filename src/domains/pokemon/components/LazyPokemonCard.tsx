// Lazy-loaded Pokemon card with Suspense boundary

import { lazy, Suspense } from 'react'
import { Pokemon } from '../types'

const PokemonCard = lazy(() =>
  import('./PokemonCard').then(module => ({ default: module.PokemonCard }))
)

// Lightweight loading placeholder for individual cards
const CardSkeleton = () => (
  <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
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

interface LazyPokemonCardProps {
  pokemon: Pokemon
  isExpanded: boolean
  onToggle: () => void
}

export const LazyPokemonCard: React.FC<LazyPokemonCardProps> = props => (
  <Suspense fallback={<CardSkeleton />}>
    <PokemonCard {...props} />
  </Suspense>
)
