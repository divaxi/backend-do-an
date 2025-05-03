import { AppointmentEntity } from '../../../../../appointments/infrastructure/persistence/relational/entities/appointment.entity';

import { ServiceEntity } from '../../../../../services/infrastructure/persistence/relational/entities/service.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'appointment_service',
})
export class AppointmentServiceEntity extends EntityRelationalHelper {
  @ManyToOne(() => AppointmentEntity, { eager: true, nullable: false })
  appointment: AppointmentEntity;

  @ManyToOne(() => ServiceEntity, { eager: true, nullable: false })
  service: ServiceEntity;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
