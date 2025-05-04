import { ScheduleEntity } from '../../../../../schedules/infrastructure/persistence/relational/entities/schedule.entity';

import { AppointmentEntity } from '../../../../../appointments/infrastructure/persistence/relational/entities/appointment.entity';

import { ServiceEntity } from '../../../../../services/infrastructure/persistence/relational/entities/service.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Column,
  Unique,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({ name: 'appointment_service' })
@Unique(['scheduleId'])
export class AppointmentServiceEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  scheduleId: string;

  @OneToOne(() => ScheduleEntity, { eager: false, nullable: false })
  @JoinColumn({ name: 'scheduleId' })
  schedule: ScheduleEntity;

  @ManyToOne(() => AppointmentEntity, { eager: true, nullable: false })
  appointment: AppointmentEntity;

  @Column()
  serviceId: string;

  @ManyToOne(() => ServiceEntity, { eager: false, nullable: false })
  @JoinColumn({ name: 'serviceId' })
  service: ServiceEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
