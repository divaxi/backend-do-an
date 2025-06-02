import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'service',
})
export class ServiceEntity extends EntityRelationalHelper {
  @ManyToOne(() => FileEntity, { eager: true, nullable: true })
  @JoinColumn()
  image?: FileEntity | null;

  @Column({
    nullable: true,
    type: Number,
  })
  price?: number | null;

  @Column({
    nullable: true,
    type: String,
  })
  description?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  serviceName: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
