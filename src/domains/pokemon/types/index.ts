// Pokemon domain type definitions

export interface Pokemon {
  id: number
  name: string
  isLegendary?: boolean
  types: string[]
  height: number
  weight: number
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
  description: string
  imageUrl: string
  generation: number
}

export interface PokemonFilters {
  search?: string
  types?: string[]
  generation?: number
  isLegendary?: boolean
}

export interface PokemonApiParams {
  page?: number
  limit?: number
  search?: string
  filters?: PokemonFilters
}

export interface PokemonCardProps {
  pokemon: Pokemon
  isExpanded?: boolean
  onToggle?: () => void
  className?: string
}

export interface PokemonGridState {
  pokemon: Pokemon[]
  loading: boolean
  error: string | null
  hasMore: boolean
  page: number
  search: string
  totalCount: number
}
