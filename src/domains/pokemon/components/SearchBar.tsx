'use client'

import React from 'react'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
  search: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  totalCount: number
  resultsCount: number
}

export function SearchBar({
  search,
  onChange,
  totalCount,
  resultsCount
}: SearchBarProps) {
  return (
    <div className="sticky top-0 z-10 bg-gray-50 pb-4 dark:bg-gray-900">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search Pokemon by name or tag ..."
          value={search}
          onChange={onChange}
          className="search-input pr-10"
          aria-label="Search Pokemon"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      {search && resultsCount > 0 && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Found {totalCount} Pokemon matching &ldquo;{search}&rdquo;
        </p>
      )}
    </div>
  )
}
