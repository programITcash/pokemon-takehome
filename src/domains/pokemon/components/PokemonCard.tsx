'use client'

import React, { memo } from 'react'
import { Pokemon } from '../types'
import { PokemonImage } from './PokemonImage'
import { PokemonHeader } from './PokemonHeader'
import { PokemonExpandedContent } from './PokemonExpandedContent'

interface PokemonCardProps {
  pokemon: Pokemon
  isExpanded: boolean
  onToggle: () => void
}

export const PokemonCard = memo(function PokemonCard({
  pokemon,
  isExpanded,
  onToggle
}: PokemonCardProps) {
  return (
    <article
      className={`pokemon-card ${isExpanded ? 'pokemon-card-expanded' : ''} cursor-pointer`}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
      aria-expanded={isExpanded}
      aria-label={`Pokemon card for ${pokemon.name}. Click to ${isExpanded ? 'collapse' : 'expand'} details`}
    >
      <PokemonImage
        imageUrl={pokemon.imageUrl}
        name={pokemon.name}
        isLegendary={pokemon.isLegendary}
      />

      <div className="p-4">
        <PokemonHeader name={pokemon.name} types={pokemon.types} />
        {isExpanded && <PokemonExpandedContent pokemon={pokemon} />}
      </div>
    </article>
  )
})
