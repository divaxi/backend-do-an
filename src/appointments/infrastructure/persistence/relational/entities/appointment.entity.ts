import { ServiceEntity } from '../../../../../services/infrastructure/persistence/relational/entities/service.entity';

import { ScheduleEntity } from '../../../../../schedules/infrastructure/persistence/relational/entities/schedule.entity';

import { CustomerRecordEntity } from '../../../../../customer-records/infrastructure/persistence/relational/entities/customer-record.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { StatusEnum } from '../../../../status.enum';

@Entity({
  name: 'appointment',
})
export class AppointmentEntity extends EntityRelationalHelper {
  @ManyToOne(() => ServiceEntity, { eager: true, nullable: false })
  service: ServiceEntity;

  @OneToOne(() => ScheduleEntity, { eager: true, nullable: false })
  @JoinColumn()
  schedule: ScheduleEntity;

  @Column({
    nullable: false,
    type: Date,
  })
  specificTime: Date;

  @Column({
    nullable: false,
    type: Boolean,
    default: true,
  })
  active?: boolean;

  @Column({
    nullable: true,
    type: String,
  })
  note?: string | null;

  @Column({
    nullable: false,
    type: 'enum',
    enum: StatusEnum,
  })
  status: StatusEnum;

  @ManyToOne(() => CustomerRecordEntity, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  customerRecord: CustomerRecordEntity;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
