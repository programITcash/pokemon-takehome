// Enhanced Pokemon grid hook with reducer pattern for complex state management

import { useCallback, useEffect, useReducer, useRef } from 'react'
import { pokemonApi } from '../api'
import { Pokemon, PokemonGridState } from '../types'
import { useDebounce } from '@/hooks/useDebounce'

const ITEMS_PER_PAGE = 20

// Action types for reducer
type PokemonGridAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_POKEMON'; payload: { pokemon: Pokemon[]; append: boolean } }
  | {
      type: 'SET_PAGINATION'
      payload: { page: number; hasMore: boolean; totalCount: number }
    }
  | { type: 'FETCH_START'; payload: { search?: string } }
  | {
      type: 'FETCH_SUCCESS'
      payload: {
        pokemon: Pokemon[]
        pagination: { hasNext: boolean; total: number } | undefined
        page: number
        append: boolean
      }
    }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'RESET_FOR_SEARCH' }

// Initial state
const initialState: PokemonGridState = {
  pokemon: [],
  loading: false,
  error: null,
  hasMore: true,
  page: 1,
  search: '',
  totalCount: 0
}

// Reducer function with comprehensive state management
function pokemonGridReducer(
  state: PokemonGridState,
  action: PokemonGridAction
): PokemonGridState {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
        error: action.payload ? null : state.error // Clear error when starting to load
      }

    case 'SET_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case 'SET_SEARCH':
      return {
        ...state,
        search: action.payload
      }

    case 'RESET_FOR_SEARCH':
      return {
        ...state,
        pokemon: [],
        page: 1,
        loading: true,
        error: null,
        hasMore: true
      }

    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        error: null,
        ...(action.payload.search !== undefined && {
          search: action.payload.search
        })
      }

    case 'FETCH_SUCCESS': {
      const { pokemon, pagination, page, append } = action.payload
      return {
        ...state,
        pokemon: append ? [...state.pokemon, ...pokemon] : pokemon,
        loading: false,
        error: null,
        page,
        hasMore: pagination?.hasNext ?? false,
        totalCount: pagination?.total ?? 0
      }
    }

    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case 'SET_POKEMON':
      return {
        ...state,
        pokemon: action.payload.append
          ? [...state.pokemon, ...action.payload.pokemon]
          : action.payload.pokemon
      }

    case 'SET_PAGINATION':
      return {
        ...state,
        page: action.payload.page,
        hasMore: action.payload.hasMore,
        totalCount: action.payload.totalCount
      }

    default:
      return state
  }
}

export function usePokemonGridReducer() {
  const [state, dispatch] = useReducer(pokemonGridReducer, initialState)
  const debouncedSearch = useDebounce(state.search, 300)
  const prevSearchRef = useRef<string>('')

  // Memoized fetch function with comprehensive error handling
  const fetchPokemon = useCallback(
    async (page: number, search: string, append = false) => {
      dispatch({ type: 'FETCH_START', payload: {} })

      try {
        const response = await pokemonApi.getPokemon({
          page,
          limit: ITEMS_PER_PAGE,
          search
        })

        const { data, pagination } = response

        dispatch({
          type: 'FETCH_SUCCESS',
          payload: {
            pokemon: data,
            pagination,
            page,
            append
          }
        })
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to fetch Pokemon'
        dispatch({ type: 'FETCH_ERROR', payload: errorMessage })
      }
    },
    []
  )

  // Optimized load more function
  const loadMore = useCallback(() => {
    if (!state.loading && state.hasMore) {
      fetchPokemon(state.page + 1, debouncedSearch, true)
    }
  }, [state.loading, state.hasMore, state.page, debouncedSearch, fetchPokemon])

  // Enhanced search function with immediate feedback
  const setSearch = useCallback((search: string) => {
    dispatch({ type: 'SET_SEARCH', payload: search })
    if (search !== prevSearchRef.current) {
      dispatch({ type: 'RESET_FOR_SEARCH' })
      prevSearchRef.current = search
    }
  }, [])

  // Retry function with current context
  const retry = useCallback(() => {
    fetchPokemon(1, debouncedSearch, false)
  }, [debouncedSearch, fetchPokemon])

  // Clear error function for better UX
  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null })
  }, [])

  // Effect to fetch data when debounced search changes
  useEffect(() => {
    fetchPokemon(1, debouncedSearch, false)
  }, [debouncedSearch, fetchPokemon])

  return {
    ...state,
    loadMore,
    setSearch,
    retry,
    clearError
  }
}
