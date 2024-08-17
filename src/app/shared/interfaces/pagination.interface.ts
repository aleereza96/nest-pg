export interface PaginationRequest {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'ASC' | 'DESC'
  params?: any
  joins?: string
}
