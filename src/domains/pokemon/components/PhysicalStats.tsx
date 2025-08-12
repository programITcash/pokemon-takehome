'use client'

import React from 'react'
import { formatMeasurement } from '../utils'

interface PhysicalStatsProps {
  height: number
  weight: number
}

export function PhysicalStats({ height, weight }: PhysicalStatsProps) {
  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-500 dark:text-gray-400">Height:</span>
        <span className="font-medium text-gray-900 dark:text-white">
          {formatMeasurement(height, 'height')}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500 dark:text-gray-400">Weight:</span>
        <span className="font-medium text-gray-900 dark:text-white">
          {formatMeasurement(weight, 'weight')}
        </span>
      </div>
    </div>
  )
}
