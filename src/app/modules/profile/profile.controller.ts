import {
  Controller,
  Get,
  Body,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ProfileService } from './profile.service'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { ProfileResponseDto } from './dto/profile-response.dto'
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger'
import { ApiGlobalResponse } from 'src/app/shared/decorators/api-global-response.decorators'

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':id')
  @ApiOperation({ description: 'Get profile by id' })
  @ApiGlobalResponse(ProfileResponseDto)
  @ApiParam({ name: 'id', type: 'number', description: 'Profile ID' })
  findOne(@Param('id') id: string): Promise<ProfileResponseDto> {
    return this.profileService.findOne(+id)
  }

  @Put(':id')
  @ApiOperation({ description: 'Update profile by id' })
  @ApiGlobalResponse(ProfileResponseDto)
  @ApiBody({ type: UpdateProfileDto, description: 'New Profile Data' })
  @ApiParam({ name: 'id', type: 'number', description: 'Profile ID' })
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileResponseDto> {
    return this.profileService.update(+id, updateProfileDto)
  }
}
