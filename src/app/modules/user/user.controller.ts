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
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserResponseDto } from './dto/user-response.dto'
import { PaginationRequest } from 'src/app/shared/interfaces/pagination.interface'
import { PaginationParams } from 'src/app/shared/decorators/pagination-params.decorator'
import { PaginationResponseDto } from 'src/app/shared/dtos/pagination-response.dto'
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { ApiGlobalResponse } from 'src/app/shared/decorators/api-global-response.decorators'
import { ApiPaginatedResponse } from 'src/app/shared/decorators/api-paginated-response.decorator'
import { Permissions } from '../permissions/decorators/permissions.decorator'

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Permissions('admin.users.create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiGlobalResponse(UserResponseDto)
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.create(createUserDto)
  }

  @Get()
  @Permissions('admin.users.read')
  @ApiOperation({ summary: 'Retrieve paginated users list' })
  @ApiPaginatedResponse(UserResponseDto)
  @ApiQuery({
    name: 'keyword',
    type: 'string',
    required: false,
    example: 'admin',
  })
  findAll(
    @PaginationParams() pagination: PaginationRequest,
  ): Promise<PaginationResponseDto<UserResponseDto>> {
    return this.userService.findAll(pagination)
  }

  @Get(':id')
  @Permissions('admin.users.read')
  @ApiOperation({ description: 'Get user by id' })
  @ApiGlobalResponse(UserResponseDto)
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.findOne(+id)
  }

  @Put(':id')
  @Permissions('admin.users.update')
  @ApiOperation({ description: 'Update user by id' })
  @ApiGlobalResponse(UserResponseDto)
  @ApiBody({ type: UpdateUserDto, description: 'New User Data' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.update(+id, updateUserDto)
  }

  @Delete(':id')
  @Permissions('admin.users.delete')
  @ApiOperation({ summary: 'Delete User by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
