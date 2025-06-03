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
      const repeater = 10;
      const admin = this.repository.create({
        zaloId: faker.string.uuid(),
        userName: `admin`,
        phoneNumber: `0000000001`,
        role: roles[0],
      });
      await this.repository.save(admin);
      const users = Array.from({ length: repeater }, () =>
        this.repository.create({
          zaloId: faker.string.uuid(),
          userName: faker.person.fullName(),
          phoneNumber: faker.phone.number({ style: 'national' }),
          role: faker.helpers.arrayElement([roles[1], roles[2]]),
        }),
      );
      await this.repository.save(users);
    }
  }
}
