import { AppointmentEntity } from '../../../../../appointments/infrastructure/persistence/relational/entities/appointment.entity';

import { ScheduleEntity } from '../../../../../schedules/infrastructure/persistence/relational/entities/schedule.entity';

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
  name: 'appointment_schedule',
})
export class AppointmentScheduleEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: Date,
  })
  specificTime: Date;

  @ManyToOne(() => AppointmentEntity, { eager: true, nullable: false })
  appointment: AppointmentEntity;

  @ManyToOne(() => ScheduleEntity, { eager: true, nullable: false })
  schedule: ScheduleEntity;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
