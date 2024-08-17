import { PaginationResponseDto } from '../dto/pagination-response.dto'
import { PaginationRequest } from '../interfaces/pagination.interface'

export class Pagination {
  static of<T>(
    { limit, page }: PaginationRequest,
    count: number,
    dtos: T[],
  ): PaginationResponseDto<T> {
    const totalPages = Math.floor(count / limit) + (count % limit > 0 ? 1 : 0)
    const currentPage = +page > 0 ? +page : 1

    return {
      totalPages: totalPages,
      content: dtos,
      currentPage: currentPage,
      count,
    }
  }
}
