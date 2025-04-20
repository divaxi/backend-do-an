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

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createStaffDto: CreateStaffDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.staffRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
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

  findById(id: Staff['id']) {
    return this.staffRepository.findById(id);
  }

  findByIds(ids: Staff['id'][]) {
    return this.staffRepository.findByIds(ids);
  }

  async update(
    id: Staff['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateStaffDto: UpdateStaffDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.staffRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Staff['id']) {
    return this.staffRepository.remove(id);
  }
}
