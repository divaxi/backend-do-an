import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { Repository } from 'typeorm';
import { RoleEnum } from '../../../../roles/roles.enum';
@Injectable()
export class RoleSeedService {
  constructor(
    @InjectRepository(RoleEntity)
    private repository: Repository<RoleEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      const roles = this.repository.create([
        {
          id: RoleEnum.admin,
          name: 'Administrator',
        },
        {
          id: RoleEnum.staff,
          name: 'Staff',
        },
        {
          id: RoleEnum.user,
          name: 'Customer',
        },
      ]);
      await this.repository.save(roles);
    }
  }
}
