const { faker } = require('@faker-js/faker')
const fs = require('fs')
const path = require('path')

// Pokemon types for variety
const pokemonTypes = [
  'Normal',
  'Fire',
  'Water',
  'Electric',
  'Grass',
  'Ice',
  'Fighting',
  'Poison',
  'Ground',
  'Flying',
  'Psychic',
  'Bug',
  'Rock',
  'Ghost',
  'Dragon',
  'Dark',
  'Steel',
  'Fairy'
]

// Use consistent placeholder images for Pokemon
function generatePokemonImageUrl(id, name) {
  // Use multiple reliable image services as fallback
  // Picsum is very reliable, we'll use different categories for variety
  const categories = [
    'nature',
    'animal',
    'forest',
    'ocean',
    'mountain',
    'wildlife',
    'landscape',
    'pets',
    'cats',
    'dogs'
  ]
  const category = categories[id % categories.length]

  // Use robohash for more unique, Pokemon-like creatures
  // This service generates unique robot/monster images based on text
  return `https://robohash.org/${encodeURIComponent(name)}-${id}.png?size=400x400&set=set2`
}

// Generate Pokemon data
function generatePokemon() {
  const id = faker.number.int({ min: 1, max: 1000 })
  const name = faker.person.firstName()
  const type = faker.helpers.arrayElement(pokemonTypes)
  const secondaryType = faker.helpers.maybe(
    () => faker.helpers.arrayElement(pokemonTypes.filter(t => t !== type)),
    { probability: 0.3 }
  )

  // Generate consistent Pokemon image
  const imageUrl = generatePokemonImageUrl(id, name)

  return {
    id,
    name,
    types: secondaryType ? [type, secondaryType] : [type],
    height: faker.number.float({ min: 0.3, max: 20.0, precision: 0.1 }),
    weight: faker.number.float({ min: 0.1, max: 1000.0, precision: 0.1 }),
    hp: faker.number.int({ min: 20, max: 255 }),
    attack: faker.number.int({ min: 5, max: 190 }),
    defense: faker.number.int({ min: 5, max: 230 }),
    specialAttack: faker.number.int({ min: 10, max: 194 }),
    specialDefense: faker.number.int({ min: 10, max: 230 }),
    speed: faker.number.int({ min: 5, max: 200 }),
    description: faker.lorem.sentence(),
    imageUrl,
    isLegendary: faker.helpers.maybe(() => true, { probability: 0.05 }),
    generation: faker.number.int({ min: 1, max: 9 })
  }
}

// Generate 1000 Pokemon
const pokemonData = Array.from({ length: 1000 }, generatePokemon)

// Ensure unique IDs
pokemonData.forEach((pokemon, index) => {
  pokemon.id = index + 1
})

// Write to file (delete existing first to avoid corruption)
const outputPath = path.join(__dirname, '..', 'src', 'data', 'pokemon.json')
const outputDir = path.dirname(outputPath)

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Delete existing file first to ensure clean generation
if (fs.existsSync(outputPath)) {
  fs.unlinkSync(outputPath)
  console.log('Deleted existing pokemon.json to ensure clean generation')
}

fs.writeFileSync(outputPath, JSON.stringify(pokemonData, null, 2))

console.log(
  `Generated ${pokemonData.length} Pokemon and saved to ${outputPath}`
)
console.log('Sample Pokemon:', pokemonData[0])
console.log('Using Robohash for unique Pokemon-like creature images')
