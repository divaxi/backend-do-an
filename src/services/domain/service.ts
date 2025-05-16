import { FileType } from '../../files/domain/file';
import { ApiProperty } from '@nestjs/swagger';

export class Service {
  @ApiProperty({
    type: () => FileType,
    nullable: true,
  })
  image?: FileType | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  price?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  serviceName: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
