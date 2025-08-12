'use client'

import React from 'react'

interface PokemonHeaderProps {
  name: string
  types: string[]
}

export function PokemonHeader({ name, types }: PokemonHeaderProps) {
  const getTypeClass = (type: string) => `type-${type.toLowerCase()}`

  return (
    <div className="mb-3">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {name}
      </h3>
      <div className="mt-2 flex flex-wrap gap-1">
        {types.map(type => (
          <span
            key={type}
            className={`${getTypeClass(type)} rounded-full px-3 py-1 text-xs font-medium`}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  )
}
