import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceRepository } from './infrastructure/persistence/service.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Service } from './domain/service';

@Injectable()
export class ServicesService {
  constructor(
    // Dependencies here
    private readonly serviceRepository: ServiceRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createServiceDto: CreateServiceDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.serviceRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.serviceRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Service['id']) {
    return this.serviceRepository.findById(id);
  }

  findByIds(ids: Service['id'][]) {
    return this.serviceRepository.findByIds(ids);
  }

  async update(
    id: Service['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateServiceDto: UpdateServiceDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.serviceRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Service['id']) {
    return this.serviceRepository.remove(id);
  }
}
