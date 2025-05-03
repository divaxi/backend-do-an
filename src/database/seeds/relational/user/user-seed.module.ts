import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserSeedService } from './user-seed.service';
import { UserFactory } from './user.factory';

import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { RoleEntity } from '../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { FileEntity } from '../../../../files/infrastructure/persistence/relational/entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity, FileEntity])],
  providers: [UserSeedService, UserFactory],
  exports: [UserSeedService, UserFactory],
})
export class UserSeedModule {}
