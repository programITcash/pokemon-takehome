'use client'

import React, { useState, useCallback } from 'react'
import { usePokemonGrid } from '../hooks/usePokemonGrid'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { PokemonCard } from './PokemonCard'
import { SearchBar } from './SearchBar'
import {
  SearchLoadingState,
  InitialLoadingState,
  EmptyState,
  ErrorState,
  LoadMoreState,
  EndOfResultsState
} from './GridStates'

export default function PokemonGrid() {
  const {
    pokemon,
    loading,
    error,
    hasMore,
    search,
    totalCount,
    loadMore,
    setSearch,
    retry
  } = usePokemonGrid()

  // Local state
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())
  const [isSearching, setIsSearching] = useState(false)

  // Infinite scroll ref
  const sentinelRef = useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore,
    loading
  })

  // Stable search handler
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setIsSearching(!!value)
      setSearch(value)
      setExpandedCards(new Set())
    },
    [setSearch]
  )

  // Toggle card expansion
  const toggleCard = useCallback((id: number) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }, [])

  // Reset searching state when loading completes
  React.useEffect(() => {
    if (!loading && isSearching) {
      setIsSearching(false)
    }
  }, [loading, isSearching, search])

  return (
    <div className="space-y-6">
      <SearchBar
        search={search}
        onChange={handleSearchChange}
        totalCount={totalCount}
        resultsCount={pokemon.length}
      />

      {error && !loading && <ErrorState error={error} onRetry={retry} />}

      {(loading || isSearching) && pokemon.length === 0 && (
        <>
          {search ? (
            <SearchLoadingState search={search} />
          ) : (
            <InitialLoadingState />
          )}
        </>
      )}

      {!loading && !isSearching && pokemon.length === 0 && search && (
        <EmptyState search={search} />
      )}

      {pokemon.length > 0 && (
        <>
          <div className="pokemon-grid">
            {pokemon.map(p => (
              <div key={p.id} className="fade-in">
                <PokemonCard
                  pokemon={p}
                  isExpanded={expandedCards.has(p.id)}
                  onToggle={() => toggleCard(p.id)}
                />
              </div>
            ))}
          </div>

          <LoadMoreState loading={loading && pokemon.length > 0} />

          {hasMore && (
            <div ref={sentinelRef} className="h-10" aria-hidden="true" />
          )}

          {!hasMore && pokemon.length > 0 && (
            <EndOfResultsState
              pokemonCount={pokemon.length}
              totalCount={totalCount}
            />
          )}
        </>
      )}
    </div>
  )
}
