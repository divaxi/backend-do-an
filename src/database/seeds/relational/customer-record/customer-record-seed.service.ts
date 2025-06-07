import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRecordEntity } from '../../../../customer-records/infrastructure/persistence/relational/entities/customer-record.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { faker } from '@faker-js/faker';
@Injectable()
export class CustomerRecordSeedService {
  constructor(
    @InjectRepository(CustomerRecordEntity)
    private repository: Repository<CustomerRecordEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      const users = await this.userRepository.find({
        where: { role: { id: 3 } },
      });
      const repeater = 4;
      const customerRecords: CustomerRecordEntity[] = Array.from(
        { length: repeater },
        () =>
          this.repository.create({
            user: faker.helpers.arrayElement(users),
            fullName: faker.person.fullName(),
            DOB: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }),
            CCCDNumber: faker.string.numeric(12),
            BHYTNumber: faker.string.numeric(12),
            active: true,
            sex: faker.person.sex(),
          }),
      );
      await this.repository.save(customerRecords);
    }
  }
}
