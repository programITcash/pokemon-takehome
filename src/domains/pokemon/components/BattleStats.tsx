'use client'

import React from 'react'
import { getStatColor } from '../utils'

interface BattleStatsProps {
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
}

interface StatBarProps {
  name: string
  value: number
  max: number
}

function StatBar({ name, value, max }: StatBarProps) {
  const percentage = (value / max) * 100

  return (
    <div>
      <div className="flex justify-between text-xs">
        <span className="text-gray-600 dark:text-gray-400">{name}</span>
        <span className="font-medium text-gray-900 dark:text-white">
          {value}
        </span>
      </div>
      <div className="stat-bar">
        <div
          className={`stat-fill ${getStatColor(percentage)}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  )
}

export function BattleStats({
  hp,
  attack,
  defense,
  specialAttack,
  specialDefense,
  speed
}: BattleStatsProps) {
  const stats = [
    { name: 'HP', value: hp, max: 255 },
    { name: 'Attack', value: attack, max: 190 },
    { name: 'Defense', value: defense, max: 230 },
    { name: 'Sp. Attack', value: specialAttack, max: 194 },
    { name: 'Sp. Defense', value: specialDefense, max: 230 },
    { name: 'Speed', value: speed, max: 200 }
  ]

  return (
    <div className="pokemon-stats">
      <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
        Battle Stats
      </h4>
      {stats.map(stat => (
        <StatBar
          key={stat.name}
          name={stat.name}
          value={stat.value}
          max={stat.max}
        />
      ))}
    </div>
  )
}
