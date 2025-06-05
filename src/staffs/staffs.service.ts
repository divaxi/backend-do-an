import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffRepository } from './infrastructure/persistence/staff.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Staff } from './domain/staff';
import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';
import { RoleEnum } from '../roles/roles.enum';
@Injectable()
export class StaffsService {
  constructor(
    // Dependencies here
    private readonly staffRepository: StaffRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(createStaffDto: CreateStaffDto, userId: User['id']) {
    // Do not remove comment below.
    // <creating-property />
    const user = await this.usersService.update(userId, {
      role: { id: RoleEnum.staff },
    });
    return this.staffRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      note: createStaffDto.note,

      specialization: createStaffDto.specialization,
      user,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.staffRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findByUser(id: number) {
    return this.staffRepository.findByUser(id);
  }

  findById(id: Staff['id']) {
    return this.staffRepository.findById(id);
  }

  findByIds(ids: Staff['id'][]) {
    return this.staffRepository.findByIds(ids);
  }

  async update(
    id: Staff['id'],

    updateStaffDto: UpdateStaffDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.staffRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      note: updateStaffDto.note,

      specialization: updateStaffDto.specialization,
    });
  }

  remove(id: Staff['id']) {
    return this.staffRepository.remove(id);
  }
}
