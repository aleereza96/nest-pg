import { ApiProperty } from '@nestjs/swagger'

export class PaginationResponseDto<T> {
  @ApiProperty({ isArray: true, type: 'array', items: { type: 'object' } })
  content: T[]

  @ApiProperty({ description: 'Total number of items' })
  count: number

  @ApiProperty({ description: ' Total pages of items' })
  totalPages: number
  
  @ApiProperty({ description: ' Current page of items' })
  currentPage: number
}
