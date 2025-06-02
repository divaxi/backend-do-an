import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffEntity } from '../../../../staffs/infrastructure/persistence/relational/entities/staff.entity';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { RoleEnum } from '../../../../roles/roles.enum';
import { faker } from '@faker-js/faker';
@Injectable()
export class StaffSeedService {
  constructor(
    @InjectRepository(StaffEntity)
    private repository: Repository<StaffEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      const staffs = await this.userRepository.find({
        where: {
          role: {
            id: In([RoleEnum.staff, RoleEnum.admin]),
          },
        },
      });

      const staffData = this.repository.create(
        staffs.map((user) => ({
          user: user,
          note: faker.lorem.sentence({ min: 20, max: 50 }),
          specialization: faker.lorem.word(10),
        })),
      );
      await this.repository.save(staffData);
    }
  }
}
