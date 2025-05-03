import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { Repository } from 'typeorm';
import { UserFactory } from './user.factory';
import { faker } from '@faker-js/faker';
@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private userFactory: UserFactory,
  ) {}

  async run() {
    // const count = await this.repository.count();
    //
    // if (count === 0) {
    //   await this.repository.save(this.repository.create({}));
    // }
    await this.repository.save(
      faker.helpers.multiple(this.userFactory.createRandomUser(), {
        count: 5,
      }),
    );
  }
}
