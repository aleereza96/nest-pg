import { Module } from '@nestjs/common'
import { PermissionService } from './permission.service'
import { PermissionController } from './permission.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Permission } from './permission.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [TypeOrmModule, PermissionService],
})
export class PermissionModule {}
