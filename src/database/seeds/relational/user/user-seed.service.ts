import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { RoleEntity } from '../../../../roles/infrastructure/persistence/relational/entities/role.entity';
@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      const roles = await this.roleRepository.find();

      // Tạo người dùng với role roles[1]
      const user1 = this.repository.create({
        zaloId: '7321013989298890468',
        userName: faker.person.fullName(),
        phoneNumber: '84377438701',
        role: roles[1],
      });

      // Tạo người dùng với role roles[2]
      const user2 = this.repository.create({
        zaloId: '0000000002',
        userName: faker.person.fullName(),
        phoneNumber: '0000000002',
        role: roles[2],
      });

      const user3 = this.repository.create({
        zaloId: '0000000003',
        userName: faker.person.fullName(),
        phoneNumber: '0000000003',
        role: roles[2],
      });

      await this.repository.save([user1, user2, user3]);
    }
  }
}
