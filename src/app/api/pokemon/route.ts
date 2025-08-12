import { NextRequest, NextResponse } from 'next/server'
import pokemonData from '@/data/pokemon.json'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''

    let filteredPokemon = pokemonData

    // Apply search filter if provided
    if (search) {
      const searchLower = search.toLowerCase().trim()
      filteredPokemon = pokemonData.filter(pokemon => {
        const nameLower = pokemon.name.toLowerCase()

        // Primary: exact name matches (full or partial)
        const nameMatches = nameLower.includes(searchLower)

        // Secondary: exact type matches only
        const typeMatches = pokemon.types.some(type => {
          const typeLower = type.toLowerCase()
          return typeLower === searchLower || typeLower.startsWith(searchLower)
        })

        // Legendary status search - match partial "legendary" terms
        const legendaryMatches =
          pokemon.isLegendary &&
          ('legendary'.includes(searchLower) ||
            'legend'.includes(searchLower)) &&
          searchLower.length >= 3

        // Only search descriptions for longer, specific terms (5+ chars)
        // and only match complete words to avoid Latin word fragments
        let descriptionMatches = false
        if (searchLower.length >= 5) {
          const words = pokemon.description.toLowerCase().split(/\s+/)
          descriptionMatches = words.some(
            word => word === searchLower || word.startsWith(searchLower)
          )
        }

        return (
          nameMatches || typeMatches || legendaryMatches || descriptionMatches
        )
      })

      // Sort results to prioritize better matches
      filteredPokemon.sort((a, b) => {
        const aName = a.name.toLowerCase()
        const bName = b.name.toLowerCase()
        const searchLower = search.toLowerCase()

        // Legendary search: prioritize legendary status for any legendary-related search
        if (
          ('legendary'.includes(searchLower) ||
            'legend'.includes(searchLower)) &&
          searchLower.length >= 3
        ) {
          if (a.isLegendary && !b.isLegendary) return -1
          if (b.isLegendary && !a.isLegendary) return 1
          return aName.localeCompare(bName)
        }

        // Exact match first
        if (aName === searchLower && bName !== searchLower) return -1
        if (bName === searchLower && aName !== searchLower) return 1

        // Starts with match next
        const aStartsWith = aName.startsWith(searchLower)
        const bStartsWith = bName.startsWith(searchLower)
        if (aStartsWith && !bStartsWith) return -1
        if (bStartsWith && !aStartsWith) return 1

        // Then alphabetical
        return aName.localeCompare(bName)
      })
    }

    // Calculate pagination
    const total = filteredPokemon.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPokemon = filteredPokemon.slice(startIndex, endIndex)

    return NextResponse.json({
      data: paginatedPokemon,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('Error fetching Pokemon:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Pokemon' },
      { status: 500 }
    )
  }
}
