import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from '../../../../files/infrastructure/persistence/relational/entities/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileSeedService {
  constructor(
    @InjectRepository(FileEntity)
    private repository: Repository<FileEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      const dummyImage = 'https://placehold.co/600x400?text=Kim+Cuong';
      const dummyFile = this.repository.create({
        path: dummyImage,
      });
      await this.repository.save(dummyFile);
    }
  }
}
