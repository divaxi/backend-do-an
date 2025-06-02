import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { UserSeedService } from './user-seed.service';
import { RoleEntity } from '../../../../roles/infrastructure/persistence/relational/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([RoleEntity]),
  ],
  providers: [UserSeedService],
  exports: [UserSeedService],
})
export class UserSeedModule {}
