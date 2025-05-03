import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'customer_record',
})
export class CustomerRecordEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: Boolean,
  })
  active?: boolean;

  @Column({
    nullable: true,
    type: String,
  })
  BHYTNumber?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  CCCDNumber?: string | null;

  @Column({
    nullable: false,
    type: Date,
  })
  DOB: Date;

  @Column({
    nullable: false,
    type: String,
  })
  sex: string;

  @Column({
    nullable: false,
    type: String,
  })
  fullName: string;

  @ManyToOne(() => UserEntity, { eager: true, nullable: false })
  user?: UserEntity;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
