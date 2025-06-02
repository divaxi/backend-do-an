import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from '../../../../services/infrastructure/persistence/relational/entities/service.entity';
import { Repository } from 'typeorm';
import { FileEntity } from '../../../../files/infrastructure/persistence/relational/entities/file.entity';
import { faker } from '@faker-js/faker';
@Injectable()
export class ServiceSeedService {
  constructor(
    @InjectRepository(ServiceEntity)
    private repository: Repository<ServiceEntity>,
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      const repeater = 10;
      const images = await this.fileRepository.find();
      const services = this.repository.create(
        Array.from({ length: repeater }, (_, index) => ({
          serviceName: `Service ${index + 1}`,
          description: faker.lorem.sentence(20),
          price: faker.number.int({ min: 100000, max: 1000000 }),
          image: faker.helpers.arrayElement(images),
        })),
      );
      await this.repository.save(services);
    }
  }
}
