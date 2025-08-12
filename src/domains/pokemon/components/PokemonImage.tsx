'use client'

import React from 'react'

interface PokemonImageProps {
  imageUrl: string
  name: string
  isLegendary: boolean
}

export function PokemonImage({
  imageUrl,
  name,
  isLegendary
}: PokemonImageProps) {
  return (
    <div className="relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={`${name} Pokemon`}
        className="pokemon-image"
        loading="lazy"
      />
      {isLegendary && (
        <span className="absolute right-2 top-2 rounded bg-yellow-500 px-2 py-1 text-xs font-bold text-white">
          Legendary
        </span>
      )}
    </div>
  )
}
