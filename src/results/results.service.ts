import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { ResultRepository } from './infrastructure/persistence/result.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Result } from './domain/result';

@Injectable()
export class ResultsService {
  constructor(
    // Dependencies here
    private readonly resultRepository: ResultRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createResultDto: CreateResultDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.resultRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.resultRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Result['id']) {
    return this.resultRepository.findById(id);
  }

  findByIds(ids: Result['id'][]) {
    return this.resultRepository.findByIds(ids);
  }

  async update(
    id: Result['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateResultDto: UpdateResultDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.resultRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Result['id']) {
    return this.resultRepository.remove(id);
  }
}
