// Pokemon API module

import { apiClient, buildQueryString } from '@/lib/api/client'
import { ApiResponse } from '@/types'
import { Pokemon, PokemonApiParams } from '../types'

export const pokemonApi = {
  /**
   * Fetch paginated Pokemon with optional search and filters
   */
  async getPokemon(
    params: PokemonApiParams = {}
  ): Promise<ApiResponse<Pokemon[]>> {
    const { page = 1, limit = 20, search = '', filters } = params

    const queryParams = {
      page,
      limit,
      search,
      ...filters
    }

    const queryString = buildQueryString(queryParams)
    return apiClient.get<Pokemon[]>(`/api/pokemon${queryString}`)
  },

  /**
   * Get a single Pokemon by ID
   */
  async getPokemonById(id: number): Promise<ApiResponse<Pokemon>> {
    return apiClient.get<Pokemon>(`/api/pokemon/${id}`)
  },

  /**
   * Get Pokemon types for filtering
   */
  async getPokemonTypes(): Promise<ApiResponse<string[]>> {
    return apiClient.get<string[]>('/api/pokemon/types')
  }
}
