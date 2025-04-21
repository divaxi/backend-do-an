import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffRepository } from './infrastructure/persistence/staff.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Staff } from './domain/staff';

@Injectable()
export class StaffsService {
  constructor(
    // Dependencies here
    private readonly staffRepository: StaffRepository,
  ) {}

  async create(createStaffDto: CreateStaffDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.staffRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      note: createStaffDto.note,

      role: createStaffDto.role,

      zaloId: createStaffDto.zaloId,

      phoneNumber: createStaffDto.phoneNumber,

      fullName: createStaffDto.fullName,
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

  findById(id: Staff['staffId']) {
    return this.staffRepository.findById(id);
  }

  findByIds(ids: Staff['staffId'][]) {
    return this.staffRepository.findByIds(ids);
  }

  async update(
    id: Staff['staffId'],

    updateStaffDto: UpdateStaffDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.staffRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      note: updateStaffDto.note,

      role: updateStaffDto.role,

      zaloId: updateStaffDto.zaloId,

      phoneNumber: updateStaffDto.phoneNumber,

      fullName: updateStaffDto.fullName,
    });
  }

  remove(id: Staff['staffId']) {
    return this.staffRepository.remove(id);
  }
}
