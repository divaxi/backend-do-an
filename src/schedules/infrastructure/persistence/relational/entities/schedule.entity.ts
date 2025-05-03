import { StaffEntity } from '../../../../../staffs/infrastructure/persistence/relational/entities/staff.entity';

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
  name: 'schedule',
})
export class ScheduleEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  note?: string | null;

  @Column({
    nullable: false,
    type: Boolean,
  })
  active?: boolean;

  @Column({
    nullable: false,
    type: Date,
  })
  endTime: Date;

  @Column({
    nullable: false,
    type: Date,
  })
  startTime: Date;

  @ManyToOne(() => StaffEntity, { eager: true, nullable: false })
  staff: StaffEntity;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
