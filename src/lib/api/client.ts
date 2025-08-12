// API client with error handling and retry logic

import { ApiError, ApiResponse } from '@/types'

interface RequestOptions extends RequestInit {
  retries?: number
  retryDelay?: number
}

class ApiClient {
  private baseURL: string
  private defaultRetries = 3
  private defaultRetryDelay = 1000

  constructor(baseURL = '') {
    this.baseURL = baseURL
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  private async fetchWithRetry<T>(
    url: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const {
      retries = this.defaultRetries,
      retryDelay = this.defaultRetryDelay,
      ...fetchOptions
    } = options

    let lastError: Error | null = null

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, {
          ...fetchOptions,
          headers: {
            'Content-Type': 'application/json',
            ...fetchOptions.headers
          }
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return data
      } catch (error) {
        lastError = error as Error

        // Don't retry on client errors (4xx)
        if (error instanceof Error && error.message.includes('status: 4')) {
          throw this.handleError(error)
        }

        // Retry with exponential backoff
        if (attempt < retries) {
          await this.delay(retryDelay * Math.pow(2, attempt))
          continue
        }
      }
    }

    throw this.handleError(lastError!)
  }

  private handleError(error: Error): ApiError {
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', error)
    }

    return {
      message: error.message || 'An unexpected error occurred',
      code: 'API_ERROR',
      details: error
    }
  }

  async get<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`
      const data = await this.fetchWithRetry<ApiResponse<T>>(url, {
        method: 'GET',
        ...options
      })
      return data
    } catch (error) {
      throw error
    }
  }

  async post<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`
      const data = await this.fetchWithRetry<ApiResponse<T>>(url, {
        method: 'POST',
        body: body ? JSON.stringify(body) : undefined,
        ...options
      })
      return data
    } catch (error) {
      throw error
    }
  }
}

// Create singleton instance
export const apiClient = new ApiClient()

// Helper function for constructing query strings
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildQueryString(params: Record<string, any>): string {
  const queryParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(v => queryParams.append(key, String(v)))
      } else {
        queryParams.append(key, String(value))
      }
    }
  })

  const queryString = queryParams.toString()
  return queryString ? `?${queryString}` : ''
}
