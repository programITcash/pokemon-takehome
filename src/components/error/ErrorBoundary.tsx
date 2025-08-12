// Error boundary component for graceful error handling

import React from 'react'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to error reporting service
    console.error('Error caught by boundary:', error, errorInfo)

    // Call optional error handler
    this.props.onError?.(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Enhanced error UI with large gradient 404
      return (
        <div className="flex min-h-[600px] flex-col items-center justify-center p-8 text-center">
          <div className="mx-auto max-w-lg">
            {/* Large Gradient 404 */}
            <div className="mb-8 flex justify-center">
              <h1
                className="text-9xl font-black tracking-tight animate-pulse select-none"
                style={{
                  background:
                    'conic-gradient(from 0deg, #ff5a1f, #3abef5, #ffe600, #8b5cf6, #ff5a1f)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'gradientShift 4s ease-in-out infinite'
                }}
              >
                404
              </h1>
            </div>

            {/* Error Content */}
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Whoops! Something went wrong
            </h2>
            <p className="mb-2 text-lg text-gray-600 dark:text-gray-400">
              Looks like our Pokemon got a bit confused and wandered off the
              path.
            </p>
            <p className="mb-8 text-gray-500 dark:text-gray-500">
              Don&apos;t worry, we&apos;ll get them back in line!
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:-translate-y-0.5 focus-visible-ring"
              >
                Try Again
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className="w-full rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5 focus-visible-ring dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Go Home
              </button>
            </div>

            {/* Error Details (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 rounded-lg border border-red-200 bg-red-50 p-4 text-left dark:border-red-800 dark:bg-red-900/20">
                <summary className="cursor-pointer font-medium text-red-800 dark:text-red-400">
                  Error Details (Dev Only)
                </summary>
                <pre className="mt-2 overflow-auto text-xs text-red-700 dark:text-red-300">
                  {this.state.error.message}
                  {'\n\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
