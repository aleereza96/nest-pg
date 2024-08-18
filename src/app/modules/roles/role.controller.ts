import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { RoleService } from './role.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { RoleResponseDto } from './dto/role-response.dto'
import { PaginationRequest } from 'src/app/shared/interfaces/pagination.interface'
import { PaginationParams } from 'src/app/shared/decorators/pagination-params.decorator'
import { PaginationResponseDto } from 'src/app/shared/dtos/pagination-response.dto'
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { ApiGlobalResponse } from 'src/app/shared/decorators/api-global-response.decorators'
import { ApiPaginatedResponse } from 'src/app/shared/decorators/api-paginated-response.decorator'
import { Permissions } from '../permissions/decorators/permissions.decorator'

@ApiTags('Roles')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Permissions('admin.roles.create')
  @ApiOperation({ summary: 'Create a new role' })
  @ApiBody({ type: CreateRoleDto })
  @ApiGlobalResponse(RoleResponseDto)
  @UsePipes(new ValidationPipe())
  create(@Body() createRoleDto: CreateRoleDto): Promise<RoleResponseDto> {
    return this.roleService.create(createRoleDto)
  }

  @Get()
  @Permissions('admin.roles.read')
  @ApiOperation({ summary: 'Retrieve paginated roles list' })
  @ApiPaginatedResponse(RoleResponseDto)
  @ApiQuery({
    name: 'keyword',
    type: 'string',
    required: false,
    example: 'admin',
  })
  findAll(
    @PaginationParams() pagination: PaginationRequest,
  ): Promise<PaginationResponseDto<RoleResponseDto>> {
    return this.roleService.findAll(pagination)
  }

  @Get(':id')
  @Permissions('admin.roles.read')
  @ApiOperation({ description: 'Get role by id' })
  @ApiGlobalResponse(RoleResponseDto)
  @ApiParam({ name: 'id', type: 'number', description: 'Role ID' })
  findOne(@Param('id') id: string): Promise<RoleResponseDto> {
    return this.roleService.findOne(+id)
  }

  @Put(':id')
  @Permissions('admin.roles.update')
  @ApiOperation({ description: 'Update role by id' })
  @ApiGlobalResponse(RoleResponseDto)
  @ApiBody({ type: UpdateRoleDto, description: 'New Role Data' })
  @ApiParam({ name: 'id', type: 'number', description: 'Role ID' })
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<RoleResponseDto> {
    return this.roleService.update(+id, updateRoleDto)
  }

  @Delete(':id')
  @Permissions('admin.roles.delete')
  @ApiOperation({ summary: 'Delete Role by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Role ID' })
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id)
  }
}
