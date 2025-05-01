import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { RoleEnum } from '../../../../roles/roles.enum';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async run() {
    const countAdmin = await this.repository.count({
      where: {
        role: {
          id: RoleEnum.admin,
        },
      },
    });

    if (!countAdmin) {
      await this.repository.save(
        this.repository.create({
          userName: 'Super',
          zaloId: '1231412',
          phoneNumber: '21431242141',
          role: {
            id: RoleEnum.admin,
            name: 'Admin',
          },
        }),
      );
    }

    const countUser = await this.repository.count({
      where: {
        role: {
          id: RoleEnum.user,
        },
      },
    });

    if (!countUser) {
      await this.repository.save(
        this.repository.create({
          userName: 'John',
          phoneNumber: '1234214324523',
          zaloId: 'john.doe@example.com',
          role: {
            id: RoleEnum.user,
            name: 'Admin',
          },
        }),
      );
    }
  }
}
