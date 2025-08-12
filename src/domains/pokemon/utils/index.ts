// Pokemon domain utility functions

/**
 * Type color mapping for Pokemon types
 */
export const typeColors: Record<string, string> = {
  Normal: 'bg-slate-400 hover:bg-slate-500',
  Fire: 'bg-red-500 hover:bg-red-600',
  Water: 'bg-blue-500 hover:bg-blue-600',
  Electric: 'bg-yellow-500 hover:bg-yellow-600',
  Grass: 'bg-green-500 hover:bg-green-600',
  Ice: 'bg-cyan-300 hover:bg-cyan-400',
  Fighting: 'bg-red-700 hover:bg-red-800',
  Poison: 'bg-purple-500 hover:bg-purple-600',
  Ground: 'bg-amber-600 hover:bg-amber-700',
  Flying: 'bg-indigo-400 hover:bg-indigo-500',
  Psychic: 'bg-pink-500 hover:bg-pink-600',
  Bug: 'bg-lime-500 hover:bg-lime-600',
  Rock: 'bg-amber-700 hover:bg-amber-800',
  Ghost: 'bg-purple-700 hover:bg-purple-800',
  Dragon: 'bg-indigo-700 hover:bg-indigo-800',
  Dark: 'bg-slate-800 hover:bg-slate-900',
  Steel: 'bg-slate-500 hover:bg-slate-600',
  Fairy: 'bg-pink-300 hover:bg-pink-400'
}

/**
 * Get the appropriate color class for a Pokemon type
 */
export function getTypeColor(type: string): string {
  return typeColors[type] || 'bg-slate-400 hover:bg-slate-500'
}

/**
 * Format Pokemon stats for display
 */
export function formatStat(statName: string, value: number): string {
  const maxStats: Record<string, number> = {
    hp: 255,
    attack: 190,
    defense: 230,
    specialAttack: 194,
    specialDefense: 230,
    speed: 200
  }

  const max = maxStats[statName] || 255
  const percentage = (value / max) * 100

  return `${value} (${Math.round(percentage)}%)`
}

/**
 * Get stat bar color based on percentage
 */
export function getStatColor(percentage: number): string {
  if (percentage >= 80) return 'bg-green-500'
  if (percentage >= 60) return 'bg-yellow-500'
  if (percentage >= 40) return 'bg-orange-500'
  return 'bg-red-500'
}

/**
 * Format Pokemon height and weight
 */
export function formatMeasurement(
  value: number,
  unit: 'height' | 'weight'
): string {
  const roundedValue = Math.round(value * 10) / 10
  if (unit === 'height') {
    return `${roundedValue} m`
  }
  return `${roundedValue} kg`
}
