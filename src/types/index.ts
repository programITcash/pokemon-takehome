// Global type definitions

export interface ApiResponse<T> {
  data: T
  pagination?: PaginationInfo
  error?: string
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface ApiError {
  message: string
  code?: string
  details?: unknown
}
