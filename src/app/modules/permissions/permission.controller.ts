import { Controller, Get } from '@nestjs/common'
import { PermissionService } from './permission.service'
import { PermissionResponseDto } from './dto/permission-response.dto'
import { ApiOperation, ApiQuery } from '@nestjs/swagger'
import { ApiPaginatedResponse } from 'src/app/shared/decorators/api-paginated-response.decorator'
import { PaginationParams } from 'src/app/shared/decorators/pagination-params.decorator'
import { PaginationRequest } from 'src/app/shared/interfaces/pagination.interface'
import { PaginationResponseDto } from 'src/app/shared/dtos/pagination-response.dto'

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve paginated permissions list' })
  @ApiPaginatedResponse(PermissionResponseDto)
  @ApiQuery({
    name: 'keyword',
    type: 'string',
    required: false,
    example: 'admin',
  })
  @ApiQuery({
    name: 'active',
    type: 'boolean',
    required: false,
    example: 'true',
  })
  findAll(
    @PaginationParams() pagination: PaginationRequest,
  ): Promise<PaginationResponseDto<PermissionResponseDto>> {
    return this.permissionService.findAll(pagination)
  }
}
