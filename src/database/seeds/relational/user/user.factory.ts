import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { FileEntity } from '../../../../files/infrastructure/persistence/relational/entities/file.entity';
@Injectable()
export class UserFactory {
  constructor(
    @InjectRepository(UserEntity)
    private repositoryUser: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private repositoryRole: Repository<RoleEntity>,
    @InjectRepository(FileEntity)
    private repositoryFile: Repository<FileEntity>,
  ) {}

  createRandomUser() {
    // Need for saving "this" context
    return () => {
      const avatar = this.repositoryFile.create({
        id: faker.string.uuid(),
        path: 'https://i.imgur.com/PJilgN4.jpeg',
      });
      console.log(avatar);
      // let role = await this.repositoryRole.create({
      //   id: RoleEnum.staff,
      //   name: 'Staff',
      // });
      return this.repositoryUser.create({
        userName: faker.person.firstName(),
        phoneNumber: faker.phone.number(),
        zaloId: faker.string.uuid(),
        // role: role,
        avatar: avatar,
      });
    };
  }
}
