'use client'

import React from 'react'
import { Pokemon } from '../types'
import { PhysicalStats } from './PhysicalStats'
import { BattleStats } from './BattleStats'

interface PokemonExpandedContentProps {
  pokemon: Pokemon
}

export function PokemonExpandedContent({
  pokemon
}: PokemonExpandedContentProps) {
  return (
    <div className="slide-up space-y-4">
      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {pokemon.description}
      </p>

      {/* Physical Stats */}
      <PhysicalStats height={pokemon.height} weight={pokemon.weight} />

      {/* Battle Stats */}
      <BattleStats
        hp={pokemon.hp}
        attack={pokemon.attack}
        defense={pokemon.defense}
        specialAttack={pokemon.specialAttack}
        specialDefense={pokemon.specialDefense}
        speed={pokemon.speed}
      />

      {/* Generation */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Generation {pokemon.generation}
      </div>
    </div>
  )
}
