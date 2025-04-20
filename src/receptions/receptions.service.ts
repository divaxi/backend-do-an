import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateReceptionDto } from './dto/create-reception.dto';
import { UpdateReceptionDto } from './dto/update-reception.dto';
import { ReceptionRepository } from './infrastructure/persistence/reception.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Reception } from './domain/reception';

@Injectable()
export class ReceptionsService {
  constructor(
    // Dependencies here
    private readonly receptionRepository: ReceptionRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createReceptionDto: CreateReceptionDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.receptionRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.receptionRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Reception['id']) {
    return this.receptionRepository.findById(id);
  }

  findByIds(ids: Reception['id'][]) {
    return this.receptionRepository.findByIds(ids);
  }

  async update(
    id: Reception['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateReceptionDto: UpdateReceptionDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.receptionRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Reception['id']) {
    return this.receptionRepository.remove(id);
  }
}
