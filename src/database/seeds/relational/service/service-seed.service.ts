import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from '../../../../services/infrastructure/persistence/relational/entities/service.entity';
import { Repository } from 'typeorm';
import { FileEntity } from '../../../../files/infrastructure/persistence/relational/entities/file.entity';

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
      const images = await this.fileRepository.find();
      const services = this.repository.create([
        {
          serviceName: 'Khám và tư vấn răng miệng',
          description:
            'Khám tổng quát răng miệng, chụp X-quang và tư vấn điều trị. Bao gồm kiểm tra sâu răng, viêm nướu và các vấn đề răng miệng khác.',
          price: 200000,
          image: images[0],
        },
        {
          serviceName: 'Cạo vôi răng',
          description:
            'Làm sạch cao răng, mảng bám và vết ố trên răng. Giúp ngăn ngừa viêm nướu và các bệnh răng miệng.',
          price: 300000,
          image: images[0],
        },
        {
          serviceName: 'Trám răng thẩm mỹ',
          description:
            'Trám răng sâu bằng vật liệu composite cao cấp, đảm bảo tính thẩm mỹ và độ bền cao.',
          price: 500000,
          image: images[0],
        },
        {
          serviceName: 'Tẩy trắng răng',
          description:
            'Tẩy trắng răng bằng công nghệ laser hiện đại, an toàn và hiệu quả cao.',
          price: 1500000,
          image: images[0],
        },
        {
          serviceName: 'Niềng răng',
          description:
            'Điều chỉnh răng mọc lệch, hô, móm bằng các phương pháp niềng răng hiện đại.',
          price: 25000000,
          image: images[0],
        },
        {
          serviceName: 'Bọc răng sứ',
          description:
            'Bọc răng sứ thẩm mỹ cho răng bị mẻ, ố vàng hoặc mất thẩm mỹ.',
          price: 3000000,

          image: images[0],
        },
      ]);
      await this.repository.save(services);
    }
  }
}
