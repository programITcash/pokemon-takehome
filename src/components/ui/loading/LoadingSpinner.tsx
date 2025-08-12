// Reusable loading spinner component with living gradient

import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  text?: string
  className?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
    >
      {/* Animated Spinner */}
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Outer Ring with Living Gradient */}
        <div
          className={`${sizeClasses[size]} rounded-full animate-spin`}
          style={{
            background:
              'conic-gradient(from 0deg, #ff5a1f, #3abef5, #ffe600, #8b5cf6, #ff5a1f)',
            borderRadius: '50%',
            padding: '2px',
            animation:
              'spin 2s linear infinite, gradientShift 4s ease-in-out infinite'
          }}
        >
          {/* Inner Ring for Clean Center */}
          <div className="h-full w-full rounded-full bg-white dark:bg-gray-900" />
        </div>

        {/* Center Pulsing Dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg" />
        </div>
      </div>

      {/* Loading Text */}
      {text && (
        <p
          className={`font-medium text-gray-700 dark:text-gray-300 ${textSizeClasses[size]} opacity-80`}
        >
          {text}
        </p>
      )}

      <span className="sr-only">Loading...</span>
    </div>
  )
}
