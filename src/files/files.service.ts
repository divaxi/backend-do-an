import { Injectable } from '@nestjs/common';

import { FileRepository } from './infrastructure/persistence/file.repository';
import { FileType } from './domain/file';
import { NullableType } from '../utils/types/nullable.type';
import { CreateFileDto } from './dto/createFileDto';

@Injectable()
export class FilesService {
  constructor(private readonly fileRepository: FileRepository) {}

  create(createFileDto: CreateFileDto) {
    return this.fileRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      path: createFileDto.path,
    });
  }

  findById(id: FileType['id']): Promise<NullableType<FileType>> {
    return this.fileRepository.findById(id);
  }

  findByIds(ids: FileType['id'][]): Promise<FileType[]> {
    return this.fileRepository.findByIds(ids);
  }
}
