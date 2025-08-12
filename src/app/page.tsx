import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { SkeletonGrid } from '@/components/ui/loading/SkeletonCard'

// Lazy load the PokemonGrid component for better performance
const PokemonGrid = dynamic(
  () => import('@/domains/pokemon/components/PokemonGrid'),
  {
    loading: () => <SkeletonGrid />,
    ssr: true
  }
)

export default function Home() {
  return (
    <main>
      <Suspense fallback={<SkeletonGrid />}>
        <PokemonGrid />
      </Suspense>
    </main>
  )
}
